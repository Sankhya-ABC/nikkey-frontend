import BadgeIcon from "@mui/icons-material/Badge";
import EngineeringIcon from "@mui/icons-material/Engineering";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";

const proximasVisitas = [
  {
    tenico: "Téc. Marcelo da Silva",
    data: "2025-12-15",
    hora: "11:30",
    icone: <BadgeIcon />,
  },
  {
    tenico: "Eng. Igor Santana Moraes",
    data: "2026-01-17",
    hora: "09:30",
    icone: <EngineeringIcon />,
  },
  {
    tenico: "Eng. Lucas Souza de Lima",
    data: "2026-02-12",
    hora: "11:15",
    icone: <EngineeringIcon />,
  },
  {
    tenico: "Téc. Marcelo da Silva",
    data: "2026-03-16",
    hora: "13:45",
    icone: <BadgeIcon />,
  },
  {
    tenico: "Téc. Francisco Soares Rocha",
    data: "2026-04-20",
    hora: "13:45",
    icone: <BadgeIcon />,
  },
];

export const ProximasVisitas = () => {
  return (
    <Card>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, lineHeight: 1, mb: 1.5 }}
            >
              Próximas Visitas
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <CardContent sx={{ p: 0 }}>
        <List
          sx={{
            p: 0,
            maxHeight: { xs: 400, sm: 500, md: 1043 },
            overflowY: "auto",
          }}
        >
          {proximasVisitas?.map(({ tenico, data, hora, icone }, index) => {
            return (
              <ListItem
                disablePadding
                key={index}
                sx={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
              >
                <ListItemButton
                  sx={{
                    px: 3,
                    py: { xs: 1, sm: 1.5, md: 2 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "space-between",
                      width: "100%",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: { xs: 1, sm: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: 0,
                        flex: 1,
                        width: "100%",
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 0, pr: 1 }}>
                        {icone}
                      </ListItemIcon>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: { xs: "200px", sm: "300px", md: "400px" },
                        }}
                      >
                        {tenico}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: { xs: 0.5, sm: 1 },
                        alignItems: "center",
                      }}
                    >
                      <Chip
                        label={new Date(data).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                        variant="outlined"
                        size="small"
                      />
                      <Chip label={hora} size="small" />
                    </Box>
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};
