import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  format,
  add,
  isWithinInterval,
} from "date-fns";

export type PeriodType = "month" | "week" | "year";

export const getPeriodRange = (date: Date, type: PeriodType) => {
  switch (type) {
    case "week":
      return {
        start: startOfWeek(date, { weekStartsOn: 1 }),
        end: endOfWeek(date, { weekStartsOn: 1 }),
      };
    case "month":
      return { start: startOfMonth(date), end: endOfMonth(date) };
    case "year":
      return { start: startOfYear(date), end: endOfYear(date) };
  }
};

export const formatPeriodLabel = (date: Date, type: PeriodType) => {
  switch (type) {
    case "week": {
      const { start, end } = getPeriodRange(date, "week");
      const sameMonth = start.getMonth() === end.getMonth();
      const sameYear = start.getFullYear() === end.getFullYear();

      if (sameMonth && sameYear)
        return `${format(start, "dd")} - ${format(end, "dd MMM yyyy")}`;
      if (!sameYear)
        return `${format(start, "dd MMM yy")} - ${format(end, "dd MMM yy")}`;
      return `${format(start, "dd MMM")} - ${format(end, "dd MMM yyyy")}`;
    }
    case "month":
      return format(date, "MMMM yyyy");
    case "year":
      return format(date, "yyyy");
  }
};

export const navigatePeriod = (
  date: Date,
  type: PeriodType,
  direction: "next" | "prev"
) => {
  const amount = direction === "next" ? 1 : -1;
  switch (type) {
    case "week":
      return add(date, { weeks: amount });
    case "month":
      return add(date, { months: amount });
    case "year":
      return add(date, { years: amount });
  }
};

export const isSessionInPeriod = (
  sessionDateStr: string,
  range: { start: Date; end: Date }
) => {
  const [y, m, d] = sessionDateStr.split("-").map(Number);
  const sessionDate = new Date(y, m - 1, d, 12, 0, 0);
  return isWithinInterval(sessionDate, range);
};
