import { Box, Typography } from "@mui/material";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { CardInfo } from "../components/CardInfo";

const data = [
  { name: "Fipronil", value: 56, color: "#43a0a0" },
  { name: "Deltametrina", value: 37, color: "#b34083" },
  { name: "Imidacloprido", value: 65, color: "#74c774" },
  { name: "Ácido Bórico", value: 18, color: "#cfb833" },
];

export const ConsumoDeProdutosChart = () => {
  return (
    <CardInfo title="Consumo de Produtos">
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
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <Box sx={{ width: "100%", mt: 1 }}>
        {data
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((entry) => (
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
