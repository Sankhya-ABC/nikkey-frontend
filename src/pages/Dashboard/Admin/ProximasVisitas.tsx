import RestaurantIcon from "@mui/icons-material/Restaurant";
import StoreIcon from "@mui/icons-material/Store";
import TrainIcon from "@mui/icons-material/Train";
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
    cliente: "Shopping Aricanduva",
    data: "2024-06-15",
    hora: "11:30",
    icone: <StoreIcon />,
  },
  {
    cliente: "Shopping Gran Plaza Santo André",
    data: "2024-06-17",
    hora: "09:30",
    icone: <StoreIcon />,
  },
  {
    cliente: "Shopping D",
    data: "2024-06-18",
    hora: "11:15",
    icone: <StoreIcon />,
  },
  {
    cliente: "Estação Metrô Sacomã",
    data: "2024-06-19",
    hora: "13:45",
    icone: <TrainIcon />,
  },
  {
    cliente: "Estação CPTM Suzano",
    data: "2024-06-21",
    hora: "08:30",
    icone: <TrainIcon />,
  },
  {
    cliente: "Burger King Gran Plaza Sul",
    data: "2024-06-23",
    hora: "14:30",
    icone: <RestaurantIcon />,
  },
  {
    cliente: "Bob's Morumbi",
    data: "2024-06-24",
    hora: "16:00",
    icone: <RestaurantIcon />,
  },
  {
    cliente: "McDonald's Paulista",
    data: "2024-06-25",
    hora: "10:15",
    icone: <RestaurantIcon />,
  },
  {
    cliente: "Estação Luz",
    data: "2024-06-26",
    hora: "07:50",
    icone: <TrainIcon />,
  },
  {
    cliente: "Shopping Metrô Itaquera",
    data: "2024-06-27",
    hora: "12:10",
    icone: <StoreIcon />,
  },
  {
    cliente: "Habib's Tatuapé",
    data: "2024-06-28",
    hora: "15:45",
    icone: <RestaurantIcon />,
  },
  {
    cliente: "Estação Brás",
    data: "2024-06-29",
    hora: "09:00",
    icone: <TrainIcon />,
  },
  {
    cliente: "Shopping Eldorado",
    data: "2024-07-01",
    hora: "11:00",
    icone: <StoreIcon />,
  },
  {
    cliente: "Outback Mooca Plaza",
    data: "2024-07-02",
    hora: "19:30",
    icone: <RestaurantIcon />,
  },
  {
    cliente: "Estação Metrô Sé",
    data: "2024-07-03",
    hora: "08:20",
    icone: <TrainIcon />,
  },
  {
    cliente: "Shopping Tietê Plaza",
    data: "2024-07-04",
    hora: "13:00",
    icone: <StoreIcon />,
  },
  {
    cliente: "Giraffas Centro SP",
    data: "2024-07-05",
    hora: "12:40",
    icone: <RestaurantIcon />,
  },
  {
    cliente: "Estação CPTM Guaianases",
    data: "2024-07-06",
    hora: "10:10",
    icone: <TrainIcon />,
  },
  {
    cliente: "Shopping Interlagos",
    data: "2024-07-07",
    hora: "14:20",
    icone: <StoreIcon />,
  },
  {
    cliente: "Subway Pinheiros",
    data: "2024-07-08",
    hora: "18:00",
    icone: <RestaurantIcon />,
  },
  {
    cliente: "Shopping Center Norte",
    data: "2024-07-09",
    hora: "09:45",
    icone: <StoreIcon />,
  },
  {
    cliente: "Estação Metrô Tucuruvi",
    data: "2024-07-10",
    hora: "08:15",
    icone: <TrainIcon />,
  },
  {
    cliente: "Popeyes Lapa",
    data: "2024-07-11",
    hora: "13:50",
    icone: <RestaurantIcon />,
  },
  {
    cliente: "Shopping SP Market",
    data: "2024-07-12",
    hora: "11:10",
    icone: <StoreIcon />,
  },
  {
    cliente: "Estação CPTM Osasco",
    data: "2024-07-13",
    hora: "09:25",
    icone: <TrainIcon />,
  },
  {
    cliente: "Ragazzo Santo Amaro",
    data: "2024-07-14",
    hora: "17:30",
    icone: <RestaurantIcon />,
  },
  {
    cliente: "Shopping Ibirapuera",
    data: "2024-07-15",
    hora: "15:00",
    icone: <StoreIcon />,
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
            maxHeight: { xs: 400, sm: 500, md: 633 },
            overflowY: "auto",
          }}
        >
          {proximasVisitas?.map(({ cliente, data, hora, icone }, index) => {
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
                        {cliente}
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
