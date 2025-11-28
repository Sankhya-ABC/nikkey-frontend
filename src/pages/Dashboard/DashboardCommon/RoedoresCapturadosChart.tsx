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
import { useFormContext } from "react-hook-form";
import { FormDashboard } from "./types";
import { useMemo } from "react";
import {
  DateRangeType,
  formatDateForDisplay,
  formatDateForTooltip,
  generateDayRange,
  generateMonthRange,
  generateYearRange,
  getRangeType,
  normalizeDate,
} from "./utils";

interface ChartData {
  date: string;
  dateDisplay: string;
  casos: number;
}

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

export const RoedoresCapturadosChart = () => {
  const { watch } = useFormContext<FormDashboard>();

  const dataInicio = watch("dataInicio");
  const dataFim = watch("dataFim");

  const { chartData, rangeType } = useMemo(() => {
    if (!dataInicio || !dataFim) {
      return { chartData: [], rangeType: "day" as DateRangeType };
    }

    const startDate = normalizeDate(new Date(dataInicio));
    const endDate = normalizeDate(new Date(dataFim));

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
          interval:
            chartData.length > 15 ? Math.ceil(chartData.length / 15) : 0,
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
    return formatDateForTooltip(data.date, rangeType);
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
            fill="#1551ac"
            name="Placas de Cola"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="casos"
            fill="#6f17c2"
            name="Roedores Mortos"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </CardInfo>
  );
};
