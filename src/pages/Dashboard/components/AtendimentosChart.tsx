import { Box, Card, CardContent, Typography } from "@mui/material";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "David Silva", value: 40, color: "#42A5F5" },
  { name: "José Rodrigues", value: 30, color: "#5E35B1" },
  { name: "João Victor", value: 20, color: "#FF7043" },
  { name: "Wellington Rufino", value: 10, color: "#43A047" },
];

export const AtendimentosChart = () => {
  return (
    <Card sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Atendimentos
      </Typography>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <ResponsiveContainer width="100%" height={120}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={40}
              innerRadius={20}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <Box sx={{ width: "100%", mt: 1 }}>
          <Legend
            verticalAlign="middle"
            align="left"
            layout="vertical"
            iconType="circle"
            wrapperStyle={{ fontSize: 12 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
