import type { WorkSession } from "../../../core/domain/work-session";

export const createMockedWorkSessions = (): WorkSession[] => {
  return [
    {
      id: "s1",
      projectId: "p1",
      userId: "u1",
      date: "2024-09-11",
      startTime: "04:00",
      endTime: "05:30",
      description: "Creating embeddings strategy",
      calculatedAmount: 12.0,
    },
    {
      id: "s2",
      projectId: "p1",
      userId: "u1",
      date: "2024-09-12",
      startTime: "09:00",
      endTime: "12:00",
      description: "Meeting with crew",
      calculatedAmount: 24.0,
    },
    {
      id: "s3",
      projectId: "p2",
      userId: "u1",
      date: "2024-09-13",
      startTime: "14:00",
      endTime: "16:00",
      description: "Figma to React conversion",
      calculatedAmount: 25.0,
    },
    {
      id: "s4",
      projectId: "p1",
      userId: "u1",
      date: "2024-09-14",
      startTime: "08:00",
      endTime: "10:00",
      description: "Fixing bugs in production",
      calculatedAmount: 16.0,
    },
  ];
};
