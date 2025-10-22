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
import { CardInfo } from "./CardInfo";

const data = [
  { name: "4", os: 1 },
  { name: "5", os: 1 },
  { name: "6", os: 2 },
  { name: "7", os: 2 },
  { name: "8", os: 3 },
  { name: "10", os: 1 },
  { name: "12", os: 1 },
];

export const OrdensDeServicoChart = () => {
  return (
    <CardInfo title="Ordens de Serviço ">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis
            label={{ value: "unidade", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          <Bar
            dataKey="os"
            fill="#c26a17"
            name="OS Atendidas"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </CardInfo>
  );
};
