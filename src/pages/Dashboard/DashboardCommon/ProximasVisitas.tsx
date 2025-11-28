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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import EngineeringIcon from "@mui/icons-material/Engineering";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Card>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={1}>
          <Grid item size={{ xs: 12 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, lineHeight: 1, mb: 1.5 }}
            >
              Próximas Visitas
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          padding: 0,
          paddingBottom: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12 }}>
            <List
              sx={{
                padding: 0,
                minHeight: isMobile ? undefined : 328,
                maxHeight: isMobile ? undefined : 1043,
                overflowY: "auto",
              }}
            >
              {proximasVisitas?.map(({ tenico, data, hora, icone }, index) => {
                return (
                  <ListItem disablePadding key={index}>
                    <ListItemButton sx={{ px: 3, py: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "end",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "end",
                            minWidth: 0,
                            flex: 1,
                            mr: 2,
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 0, pb: "3px", pr: 1 }}>
                            {icone}
                          </ListItemIcon>
                          <Typography
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              minWidth: 0,
                            }}
                          >
                            {tenico}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexShrink: 0 }}>
                          <Chip
                            label={new Date(data).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                            })}
                            sx={{ ml: 2 }}
                            variant="outlined"
                            size="small"
                          />
                          <Chip label={hora} sx={{ ml: 0.5 }} size="small" />
                        </Box>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
