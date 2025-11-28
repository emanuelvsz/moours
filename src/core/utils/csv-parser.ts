import { WorkSession } from "@core/domain/work-session";
import { DomainService } from "@core/services/domain";

export const parseWorkSessionCSV = async (
  file: File,
  projectId: string,
  userId: string,
  hourlyRate: number
): Promise<WorkSession[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return resolve([]);
      const lines = text.split(/\r\n|\n/).filter((line) => line.trim());
      const sessions: WorkSession[] = [];
      const dateLineRegex = /^\d{2}\/\d{2}\/\d{4}/;
      lines.forEach((line) => {
        if (!dateLineRegex.test(line)) return;
        const columns = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
        if (!columns || columns.length < 3) return;
        const cleanCols = columns.map((col) =>
          col.replace(/^"|"$/g, "").trim()
        );

        const dateCol = cleanCols[0]; // 19/09/2023
        const durationCol = cleanCols[1]; // 01:30:00
        const descriptionCol = cleanCols[2];

        try {
          // (DD/MM/YYYY -> YYYY-MM-DD)
          const normalizedDate = normalizeDate(dateCol);
          const startTime = "09:00";
          const endTime = calculateEndTime(startTime, durationCol);
          const calc = DomainService.calculateWorkSession(
            startTime,
            endTime,
            hourlyRate
          );

          sessions.push({
            id: Math.random().toString(36).substr(2, 9),
            projectId,
            userId,
            date: normalizedDate,
            startTime,
            endTime,
            description: descriptionCol || "Imported Session",
            calculatedAmount: calc.amount,
          });
        } catch (e) {
          console.warn("Skipping invalid row:", line, e);
        }
      });

      resolve(sessions);
    };

    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

const normalizeDate = (dateStr: string): string => {
  if (dateStr.includes("/")) {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
  return dateStr; 
};

// Soma a duração (H:MM:SS ou H:MM) ao horário de início
const calculateEndTime = (start: string, duration: string): string => {
  const [startH, startM] = start.split(":").map(Number);

  const cleanDuration = duration.replace(/[^0-9:]/g, "");
  const durationParts = cleanDuration.split(":").map(Number);

  const durH = durationParts[0] || 0;
  const durM = durationParts[1] || 0;
  let endH = startH + durH;
  let endM = startM + durM;

  if (endM >= 60) {
    endH += Math.floor(endM / 60);
    endM = endM % 60;
  }
  return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
};
