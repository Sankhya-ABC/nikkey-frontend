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

export const Sidebar = () => {
  return (
    <Drawer variant="permanent">
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {[
            {
              name: "Dashboard",
              icon: <SignalCellularAltIcon />,
              route: "/aaa",
            },
            {
              name: "Clientes",
              icon: <InsertEmoticonIcon />,
              route: "/aaa",
            },
            {
              name: "Usuários",
              icon: <PersonIcon />,
              route: "/aaa",
            },
            { name: "Visitas", icon: <TourIcon />, route: "/aaa" },
            {
              name: "Ordens de Serviço",
              icon: <WorkIcon />,
              route: "/aaa",
            },
            {
              name: "Relatório de Produtividade",
              icon: <AssignmentIcon />,
              route: "/aaa",
            },
          ].map(({ name, icon, route }, index) => (
            <ListItem key={name} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
