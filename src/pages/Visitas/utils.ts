import { View } from "./type";

export const startOfMonth = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), 1);

export const endOfMonth = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth() + 1, 0);

export const addMonths = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth() + n, 1);

export const addDays = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

export const addWeeks = (d: Date, n: number) => addDays(d, n * 7);

export const startOfWeek = (d: Date, weekStartsOnMonday = true) => {
  const day = d.getDay();
  const diff = weekStartsOnMonday ? (day === 0 ? -6 : 1 - day) : -day;
  const result = new Date(d);
  result.setDate(d.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

export const endOfWeek = (d: Date) => addDays(startOfWeek(d), 6);

export const formatMonthYear = (d: Date) => {
  const formated = d.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
  return formated.charAt(0).toUpperCase() + formated.slice(1);
};

export const formatDayShort = (d: Date) => {
  const formated = d.toLocaleDateString("pt-BR", { weekday: "short" });
  return formated.charAt(0).toUpperCase() + formated.slice(1).replace(".", "");
};

export const formatDayNumber = (d: Date) => d.getDate();

export const formatDate = (d: Date) => d.toLocaleDateString("pt-BR");

export const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      options.push(timeString);
    }
  }
  return options;
};

export const getDateRange = (date: Date, currentView: View) => {
  switch (currentView) {
    case View.MONTH:
      return {
        startDate: startOfMonth(date),
        endDate: endOfMonth(date),
      };
    case View.WEEK:
      const weekStart = startOfWeek(date);
      const weekEnd = endOfWeek(weekStart);
      return {
        startDate: weekStart,
        endDate: weekEnd,
      };
    case View.DAY:
      return {
        startDate: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        ),
        endDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      };
    default:
      return {
        startDate: startOfMonth(date),
        endDate: endOfMonth(date),
      };
  }
};
