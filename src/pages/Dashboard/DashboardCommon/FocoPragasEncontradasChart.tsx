import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CardInfo } from "../components/CardInfo";
import { FormDashboard } from "./types";

type DateRangeType = "day" | "month" | "year";

interface ChartData {
  date: string;
  dateDisplay: string;
  casos: number;
}

const getRangeType = (startDate: Date, endDate: Date): DateRangeType => {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();

  if (startYear !== endYear) return "year";
  if (startMonth !== endMonth) return "month";
  return "day";
};

const generateDayRange = (startDate: Date, endDate: Date): string[] => {
  const dates: string[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate).toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const generateMonthRange = (startDate: Date, endDate: Date): string[] => {
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

const generateYearRange = (startDate: Date, endDate: Date): string[] => {
  const years: string[] = [];
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  for (let year = startYear; year <= endYear; year++) {
    years.push(year.toString());
  }

  return years;
};

const formatDateForDisplay = (
  dateString: string,
  rangeType: DateRangeType,
): string => {
  switch (rangeType) {
    case "day":
      const dayDate = new Date(dateString);
      return `${String(dayDate.getDate()).padStart(2, "0")}/${String(dayDate.getMonth() + 1).padStart(2, "0")}`;

    case "month":
      const [year, month] = dateString.split("-");
      return `${month}/${year.slice(2)}`;

    case "year":
      return dateString;

    default:
      return dateString;
  }
};

const generateMockData = (
  dateRange: string[],
  rangeType: DateRangeType,
): ChartData[] => {
  return dateRange.map((date) => {
    let baseCases: number;

    switch (rangeType) {
      case "day":
        baseCases = Math.floor(Math.random() * 6);
        break;
      case "month":
        baseCases = Math.floor(Math.random() * 41) + 10;
        break;
      case "year":
        baseCases = Math.floor(Math.random() * 401) + 100;
        break;
      default:
        baseCases = 0;
    }

    const variation =
      Math.random() > 0.7 ? Math.floor(Math.random() * baseCases * 0.5) : 0;
    const casos = baseCases + variation;

    return {
      date,
      dateDisplay: formatDateForDisplay(date, rangeType),
      casos,
    };
  });
};

export const FocoPragasEncontradasChart = () => {
  const { watch } = useFormContext<FormDashboard>();

  const dataInicio = watch("dataInicio");
  const dataFim = watch("dataFim");

  console.log({ dataInicio, dataFim });

  const { chartData, rangeType } = useMemo(() => {
    if (!dataInicio || !dataFim) {
      return { chartData: [], rangeType: "day" as DateRangeType };
    }

    const startDate = new Date(dataInicio);
    const endDate = new Date(dataFim);

    const currentRangeType = getRangeType(startDate, endDate);

    let dateRange: string[] = [];

    switch (currentRangeType) {
      case "day":
        dateRange = generateDayRange(startDate, endDate);
        break;
      case "month":
        dateRange = generateMonthRange(startDate, endDate);
        break;
      case "year":
        dateRange = generateYearRange(startDate, endDate);
        break;
    }

    const mockData = generateMockData(dateRange, currentRangeType);

    return {
      chartData: mockData,
      rangeType: currentRangeType,
    };
  }, [dataInicio, dataFim]);

  const getXAxisConfig = () => {
    switch (rangeType) {
      case "day":
        return {
          dataKey: "dateDisplay",
          tick: { fontSize: 10 },
          interval: Math.ceil(chartData.length / 10),
        };
      case "month":
        return {
          dataKey: "dateDisplay",
          tick: { fontSize: 11 },
        };
      case "year":
        return {
          dataKey: "dateDisplay",
          tick: { fontSize: 12 },
        };
      default:
        return { dataKey: "dateDisplay" };
    }
  };

  const formatTooltipLabel = (label: string, payload: any[]) => {
    if (!payload || !payload[0]) return label;

    const data = payload[0].payload;

    switch (rangeType) {
      case "day":
        const dayDate = new Date(data.date);
        return `Data: ${dayDate.toLocaleDateString("pt-BR")}`;

      case "month":
        const [year, month] = data.date.split("-");
        return `Mês: ${month}/${year}`;

      case "year":
        return `Ano: ${data.date}`;

      default:
        return label;
    }
  };

  if (!dataInicio || !dataFim) {
    return (
      <CardInfo title="Foco/Pragas Encontradas">
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">
            Selecione as datas para visualizar o gráfico
          </p>
        </div>
      </CardInfo>
    );
  }

  return (
    <CardInfo title="Foco/Pragas Encontradas">
      <div className="text-xs text-gray-500 mb-2">
        Período:{" "}
        {rangeType === "day"
          ? "Dias"
          : rangeType === "month"
            ? "Meses"
            : "Anos"}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis {...getXAxisConfig()} />
          <YAxis
            label={{
              value: "Quantidade",
              angle: -90,
              position: "insideLeft",
              fontSize: 12,
            }}
          />
          <Tooltip
            formatter={(value: number) => [`${value} casos`, "Quantidade"]}
            labelFormatter={formatTooltipLabel}
          />
          <Legend verticalAlign="bottom" height={36} />
          <Bar
            dataKey="casos"
            fill="#c26a17"
            name="Pragas Encontradas"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </CardInfo>
  );
};
