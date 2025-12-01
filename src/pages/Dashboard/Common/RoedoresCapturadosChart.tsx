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
  placasCola: number;
  roedoresMortos: number;
}

const generateMockData = (
  dateRange: string[],
  rangeType: DateRangeType,
): ChartData[] => {
  return dateRange.map((date) => {
    let basePlacasCola: number;
    let baseRoedoresMortos: number;

    switch (rangeType) {
      case "day":
        basePlacasCola = Math.floor(Math.random() * 4);
        baseRoedoresMortos = Math.floor(Math.random() * 3);
        break;
      case "month":
        basePlacasCola = Math.floor(Math.random() * 31) + 5;
        baseRoedoresMortos = Math.floor(Math.random() * 21) + 5;
        break;
      case "year":
        basePlacasCola = Math.floor(Math.random() * 201) + 50;
        baseRoedoresMortos = Math.floor(Math.random() * 151) + 50;
        break;
      default:
        basePlacasCola = 0;
        baseRoedoresMortos = 0;
    }

    const variationPlacas =
      Math.random() > 0.7
        ? Math.floor(Math.random() * basePlacasCola * 0.5)
        : 0;
    const variationRoedores =
      Math.random() > 0.7
        ? Math.floor(Math.random() * baseRoedoresMortos * 0.5)
        : 0;

    return {
      date,
      dateDisplay: formatDateForDisplay(date, rangeType),
      placasCola: basePlacasCola + variationPlacas,
      roedoresMortos: baseRoedoresMortos + variationRoedores,
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
      <CardInfo title="Roedores Capturados">
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">
            Selecione as datas para visualizar o gráfico
          </p>
        </div>
      </CardInfo>
    );
  }

  return (
    <CardInfo title="Roedores Capturados">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis {...getXAxisConfig()} />
          <YAxis
            label={{
              value: "Unidade",
              angle: -90,
              position: "insideLeft",
              fontSize: 12,
            }}
          />
          <Tooltip
            formatter={(value: number, name: string) => [`${value}`, name]}
            labelFormatter={formatTooltipLabel}
          />
          <Legend verticalAlign="bottom" height={36} />
          <Bar
            dataKey="placasCola"
            fill="#1551ac"
            name="Placas de Cola"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="roedoresMortos"
            fill="#6f17c2"
            name="Roedores Mortos"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </CardInfo>
  );
};
