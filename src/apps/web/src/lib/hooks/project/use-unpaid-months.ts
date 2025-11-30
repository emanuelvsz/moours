import { useMemo } from "react";
import { format } from "date-fns";
import { useGetWorkSessions } from "../../hooks/work-session/use-get-work-sessions";
import { WorkSession } from "@core/domain/work-session";

export interface MonthlyGroup {
  key: string;
  label: string;
  month: number;
  year: number;
  totalAmount: number;
  sessions: WorkSession[];
}

export const useProjectUnpaidMonths = (projectId?: string) => {
  const { workSessions, finding } = useGetWorkSessions();

  const unpaidMonths = useMemo(() => {
    if (!projectId || finding) return [];

    const projectSessions = workSessions.filter(
      (s) => s.projectId === projectId && !s.paymentId
    );

    const groups: Record<string, MonthlyGroup> = {};
    projectSessions.forEach((session) => {
      const dateKey = session.date.slice(0, 7);

      if (!groups[dateKey]) {
        const dateObj = new Date(session.date);
        groups[dateKey] = {
          key: dateKey,
          label: format(dateObj, "MMMM yyyy"),
          month: parseInt(dateKey.split("-")[1]),
          year: parseInt(dateKey.split("-")[0]),
          totalAmount: 0,
          sessions: [],
        };
      }

      groups[dateKey].sessions.push(session);
      groups[dateKey].totalAmount += session.calculatedAmount;
    });

    return Object.values(groups).sort((a, b) => b.key.localeCompare(a.key));
  }, [workSessions, projectId, finding]);

  return {
    unpaidMonths,
    isLoading: finding,
  };
};
