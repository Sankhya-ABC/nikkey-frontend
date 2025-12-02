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
  gachon: number;
  bioSerrico: number;
}

const generateMockData = (
  dateRange: string[],
  rangeType: DateRangeType,
): ChartData[] => {
  return dateRange.map((date, index) => {
    let baseGachon: number;
    let baseBioSerrico: number;

    const trend = Math.sin(index * 0.3) * 0.5 + 0.5;

    switch (rangeType) {
      case "day":
        baseGachon = Math.floor(10 + trend * 40);
        baseBioSerrico = Math.floor(50 + trend * 150);
        break;
      case "month":
        baseGachon = Math.floor(50 + trend * 200);
        baseBioSerrico = Math.floor(200 + trend * 800);
        break;
      case "year":
        baseGachon = Math.floor(300 + trend * 700);
        baseBioSerrico = Math.floor(1000 + trend * 3000);
        break;
      default:
        baseGachon = 0;
        baseBioSerrico = 0;
    }

    const variationGachon =
      Math.random() > 0.7 ? Math.floor(Math.random() * baseGachon * 0.3) : 0;
    const variationBioSerrico =
      Math.random() > 0.7
        ? Math.floor(Math.random() * baseBioSerrico * 0.2)
        : 0;

    return {
      date,
      dateDisplay: formatDateForDisplay(date, rangeType),
      gachon: baseGachon + variationGachon,
      bioSerrico: baseBioSerrico + variationBioSerrico,
    };
  });
};

export const ArmadilhasDeFeromoniosChart = () => {
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
    if (name.includes("PRAGAS")) {
      return [`${value} gachon`, "Gachon Encontradas"];
    }
    if (name.includes("BioSerrico")) {
      return [`${value} ml`, "BioSerrico"];
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
              value: "Gachon",
              angle: -90,
              position: "insideLeft",
              fontSize: 12,
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "BioSerrico (ml)",
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
              if (value === "gachon") return "Gachon Encontradas";
              if (value === "bioSerrico") return "BioSerrico (mL)";
              return value;
            }}
          />
          <Bar
            yAxisId="left"
            dataKey="gachon"
            fill="#3799d1"
            name="Gachon Encontradas"
            radius={[4, 4, 0, 0]}
            barSize={rangeType === "day" ? 30 : 20}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="bioSerrico"
            stroke="#6f17c2"
            name="BioSerrico"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </CardInfo>
  );
};
