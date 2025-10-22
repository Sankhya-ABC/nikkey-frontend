import { Box, Typography } from "@mui/material";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CardInfo } from "./CardInfo";

const data = [
  { name: "David Silva", value: 40, color: "#42A5F5" },
  { name: "José Rodrigues", value: 30, color: "#5E35B1" },
  { name: "João Victor", value: 20, color: "#FF7043" },
  { name: "Wellington Rufino", value: 10, color: "#43A047" },
];

export const AtendimentosChart = () => {
  return (
    <CardInfo title="Atendimentos por Técnico">
      <ResponsiveContainer width="100%" height={105}>
        <PieChart>
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value} atendimentos`,
              name,
            ]}
          />

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={40}
            innerRadius={20}
            paddingAngle={2}
            cursor="pointer"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <Box sx={{ width: "100%", mt: 1 }}>
        {data.map((entry) => (
          <Box
            key={entry.name}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 0.5,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: entry.color,
                boxShadow: 1,
              }}
            />
            <Typography variant="body2" sx={{ fontSize: 13 }}>
              {entry.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: 13, ml: "auto", color: "text.secondary" }}
            >
              {entry.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </CardInfo>
  );
};
