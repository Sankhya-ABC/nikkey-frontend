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

const data = [
  { name: "4", os: 1 },
  { name: "5", os: 1 },
  { name: "6", os: 2 },
  { name: "7", os: 2 },
  { name: "8", os: 3 },
  { name: "10", os: 1 },
  { name: "12", os: 1 },
];

export const FocoPragasEncontradasChart = () => {
  const { watch } = useFormContext<FormDashboard>();

  const dataInicio = watch("dataInicio");
  const dataFim = watch("dataFim");

  return (
    <CardInfo title="Foco/Pragas Encontradas">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis />
          <YAxis
            label={{ value: "unidade", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend verticalAlign="bottom" />
          <Bar
            dataKey="os"
            fill="#c26a17"
            name="Pragas Encontradas"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </CardInfo>
  );
};
