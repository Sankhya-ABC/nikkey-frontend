import AssignmentIcon from "@mui/icons-material/Assignment";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PersonIcon from "@mui/icons-material/Person";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import TourIcon from "@mui/icons-material/Tour";
import WorkIcon from "@mui/icons-material/Work";

export const functionalities = [
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
];
