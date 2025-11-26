export interface WorkSession {
  id: string;
  projectId: string;
  userId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  description: string;
  calculatedAmount: number;
}
