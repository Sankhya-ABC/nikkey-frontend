export type DateRangeType = "day" | "month" | "year";

export const normalizeDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const getRangeType = (startDate: Date, endDate: Date): DateRangeType => {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();

  if (startYear !== endYear) return "year";
  if (startMonth !== endMonth) return "month";
  return "day";
};

export const generateDayRange = (startDate: Date, endDate: Date): string[] => {
  const dates: string[] = [];
  const currentDate = new Date(startDate);
  const normalizedEndDate = new Date(endDate);

  while (currentDate <= normalizedEndDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const generateMonthRange = (
  startDate: Date,
  endDate: Date,
): string[] => {
  const months: string[] = [];
  const currentDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    1,
  );
  const endMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

  while (currentDate <= endMonth) {
    months.push(
      `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`,
    );
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return months;
};

export const generateYearRange = (startDate: Date, endDate: Date): string[] => {
  const years: string[] = [];
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  for (let year = startYear; year <= endYear; year++) {
    years.push(year.toString());
  }

  return years;
};

export const createUTCDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

export const formatDateForDisplay = (
  dateString: string,
  rangeType: DateRangeType,
): string => {
  switch (rangeType) {
    case "day":
      const utcDate = createUTCDate(dateString);
      return `${String(utcDate.getUTCDate()).padStart(2, "0")}/${String(utcDate.getUTCMonth() + 1).padStart(2, "0")}`;
    case "month":
      const [year, month] = dateString.split("-");
      return `${month}/${year.slice(2)}`;
    case "year":
      return dateString;
    default:
      return dateString;
  }
};

export const formatDateForTooltip = (
  dateString: string,
  rangeType: DateRangeType,
): string => {
  switch (rangeType) {
    case "day":
      const utcDate = createUTCDate(dateString);
      return `${String(utcDate.getUTCDate()).padStart(2, "0")}/${String(utcDate.getUTCMonth() + 1).padStart(2, "0")}/${utcDate.getUTCFullYear()}`;
    case "month":
      const [year, month] = dateString.split("-");
      const monthNames = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
      return `${monthNames[parseInt(month) - 1]}/${year}`;
    case "year":
      return `Ano ${dateString}`;
    default:
      return dateString;
  }
};
