import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from "recharts";
import { CardInfo } from "../components/CardInfo";
import { useFormContext } from "react-hook-form";
import { FormRelatorio } from "./types";
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
} from "../../../utils/chart";

interface ChartData {
  date: string;
  dateDisplay: string;
  mortos: number;
  rodenticida: number;
}

const generateMockData = (
  dateRange: string[],
  rangeType: DateRangeType,
): ChartData[] => {
  return dateRange.map((date, index) => {
    let baseRoedoresMortos: number;
    let baseRodenticida: number;

    const trend = Math.sin(index * 0.3) * 0.5 + 0.5;

    switch (rangeType) {
      case "day":
        baseRoedoresMortos = Math.floor(10 + trend * 40);
        baseRodenticida = Math.floor(50 + trend * 150);
        break;
      case "month":
        baseRoedoresMortos = Math.floor(50 + trend * 200);
        baseRodenticida = Math.floor(200 + trend * 800);
        break;
      case "year":
        baseRoedoresMortos = Math.floor(300 + trend * 700);
        baseRodenticida = Math.floor(1000 + trend * 3000);
        break;
      default:
        baseRoedoresMortos = 0;
        baseRodenticida = 0;
    }

    const variationPragas =
      Math.random() > 0.7
        ? Math.floor(Math.random() * baseRoedoresMortos * 0.3)
        : 0;
    const variationInseticida =
      Math.random() > 0.7
        ? Math.floor(Math.random() * baseRodenticida * 0.2)
        : 0;

    return {
      date,
      dateDisplay: formatDateForDisplay(date, rangeType),
      mortos: baseRoedoresMortos + variationPragas,
      rodenticida: baseRodenticida + variationInseticida,
    };
  });
};

export const RodenticidasXRoedoresChart = () => {
  const { watch } = useFormContext<FormRelatorio>();

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

  const formatTooltipValue = (value: number, name: string) => {
    if (name.includes("mortos")) {
      return [`${value} mortos`, "Roedores Mortos"];
    }
    if (name.includes("rodenticida")) {
      return [`${value} mL`, "Rodenticida"];
    }
    return [value, name];
  };

  return (
    <CardInfo>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis {...getXAxisConfig()} />
          <YAxis
            yAxisId="left"
            label={{
              value: "Roedores Mortos",
              angle: -90,
              position: "insideLeft",
              fontSize: 12,
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "Rodenticida (g)",
              angle: 90,
              position: "insideRight",
              fontSize: 12,
            }}
          />
          <Tooltip
            formatter={formatTooltipValue}
            labelFormatter={formatTooltipLabel}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => {
              if (value === "mortos") return "Roedores Mortos";
              if (value === "rodenticida") return "Rodenticida (g)";
              return value;
            }}
          />
          <Bar
            yAxisId="left"
            dataKey="mortos"
            fill="#3799d1"
            name="Roedores Mortos"
            radius={[4, 4, 0, 0]}
            barSize={rangeType === "day" ? 30 : 20}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="rodenticida"
            stroke="#6f17c2"
            name="Rodenticida"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </CardInfo>
  );
};
