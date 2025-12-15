import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
import { CardInfo } from "../components/CardInfo";

import { FormRelatorio } from "./types";

interface ChartData {
  date: string;
  dateDisplay: string;
  inseticidaLiquido: number;
  inseticidaSolido: number;
  rodenticida: number;
}

const generateMockData = (
  dateRange: string[],
  rangeType: DateRangeType,
): ChartData[] => {
  return dateRange.map((date, index) => {
    let baseInseticidaLiquido: number;
    let baseInseticidaSolido: number;
    let baseRodenticida: number;

    const trend = Math.sin(index * 0.3) * 0.5 + 0.5;

    switch (rangeType) {
      case "day":
        baseInseticidaLiquido = Math.floor(50 + trend * 200);
        baseInseticidaSolido = Math.floor(100 + trend * 150);
        baseRodenticida = Math.floor(50 + trend * 100);
        break;
      case "month":
        baseInseticidaLiquido = Math.floor(1000 + trend * 2000);
        baseInseticidaSolido = Math.floor(1000 + trend * 1500);
        baseRodenticida = Math.floor(500 + trend * 1000);
        break;
      case "year":
        baseInseticidaLiquido = Math.floor(10000 + trend * 15000);
        baseInseticidaSolido = Math.floor(8000 + trend * 12000);
        baseRodenticida = Math.floor(5000 + trend * 8000);
        break;
      default:
        baseInseticidaLiquido = 0;
        baseInseticidaSolido = 0;
        baseRodenticida = 0;
    }

    const variationLiquido =
      Math.random() > 0.8
        ? Math.floor(Math.random() * baseInseticidaLiquido * 0.2)
        : 0;
    const variationSolido =
      Math.random() > 0.8
        ? Math.floor(Math.random() * baseInseticidaSolido * 0.2)
        : 0;
    const variationRodenticida =
      Math.random() > 0.8
        ? Math.floor(Math.random() * baseRodenticida * 0.2)
        : 0;

    return {
      date,
      dateDisplay: formatDateForDisplay(date, rangeType),
      inseticidaLiquido: baseInseticidaLiquido + variationLiquido,
      inseticidaSolido: baseInseticidaSolido + variationSolido,
      rodenticida: baseRodenticida + variationRodenticida,
    };
  });
};

export const ConsumoDeProdutosChart = () => {
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
    const unit = name.includes("LÍQUIDO")
      ? " ml"
      : name.includes("SÓLIDO") || name.includes("RODENTICIDA")
        ? " g"
        : "";
    return [`${value}${unit}`, name];
  };

  return (
    <CardInfo>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
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
            formatter={formatTooltipValue}
            labelFormatter={formatTooltipLabel}
          />
          <Legend verticalAlign="bottom" height={36} />
          <Line
            type="monotone"
            dataKey="inseticidaLiquido"
            stroke="#3799d1"
            name="Inseticida Líquido (mL)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="inseticidaSolido"
            stroke="#e45f2b"
            name="Inseticida Sólido (g)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="rodenticida"
            stroke="#41c228"
            name="Rodenticida (g)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardInfo>
  );
};
