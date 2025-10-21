import { Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Ordens de Serviço
      </Typography>
      <CardContent sx={{ height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
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
              fill="#2196f3"
              name="OS Atendidas"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
