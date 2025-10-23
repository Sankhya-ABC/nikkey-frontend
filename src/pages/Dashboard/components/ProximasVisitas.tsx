import {
  Chip,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CardInfo } from "./CardInfo";
import { DatePicker } from "../../../components/Form/DatePicker";
import { useForm } from "react-hook-form";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import TrainIcon from "@mui/icons-material/Train";
import StoreIcon from "@mui/icons-material/Store";

const proximasVisitas = [
  {
    cliente: "Shopping Aricanduva",
    data: "2024-06-15",
    hora: "11:30",
    icone: <StoreIcon />,
  },
  {
    cliente: "Shopping Penha",
    data: "2024-06-16",
    hora: "10:00",
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
    cliente: "Estação Metrô Barra Funda",
    data: "2024-06-20",
    hora: "15:00",
    icone: <TrainIcon />,
  },
  {
    cliente: "Estação CPTM Suzano",
    data: "2024-06-21",
    hora: "08:30",
    icone: <TrainIcon />,
  },
  {
    cliente: "Estação CPTM Ribeirão Pires",
    data: "2024-06-22",
    hora: "12:00",
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
];

export const ProximasVisitas = () => {
  const { control } = useForm();

  return (
    <CardInfo title="Próximas Visitas" sx={{ display: "block" }}>
      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 12, xl: 6 }}>
          <DatePicker label="Data início" name="dataInicio" control={control} />
        </Grid>
        <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 12, xl: 6 }}>
          <DatePicker label="Data Fim" name="dataFim" control={control} />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <List sx={{ padding: 0 }}>
            {proximasVisitas?.map(({ cliente, data, hora, icone }, index) => {
              return (
                <ListItem disablePadding key={index}>
                  <ListItemButton>
                    <ListItemIcon>{icone}</ListItemIcon>
                    <ListItemText primary={cliente} />
                    <Chip
                      label={new Date(data).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                      sx={{ ml: 2 }}
                      variant="outlined"
                    />
                    <Chip label={hora} sx={{ ml: 2 }} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </CardInfo>
  );
};
