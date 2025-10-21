import AssignmentIcon from "@mui/icons-material/Assignment";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PersonIcon from "@mui/icons-material/Person";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import TourIcon from "@mui/icons-material/Tour";
import WorkIcon from "@mui/icons-material/Work";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Drawer } from "./styles";
import { Link } from "react-router";

export const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 300 }}>
      <Box sx={{ maxWidth: 300, width: 300 }} role="presentation">
        <List sx={{ padding: 0 }}>
          {[
            {
              name: "Dashboard",
              icon: <SignalCellularAltIcon />,
              route: "/dashboard",
            },
            {
              name: "Clientes",
              icon: <InsertEmoticonIcon />,
              route: "/clientes",
            },
            {
              name: "Usuários",
              icon: <PersonIcon />,
              route: "/usuarios",
            },
            { name: "Visitas", icon: <TourIcon />, route: "/visitas" },
            {
              name: "Ordens de Serviço",
              icon: <WorkIcon />,
              route: "/ordens-de-servico",
            },
            {
              name: "Relatório de Produtividade",
              icon: <AssignmentIcon />,
              route: "/relatorio-de-produtividade",
            },
          ].map(({ name, icon, route }) => (
            <Link
              to={route}
              key={name}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
