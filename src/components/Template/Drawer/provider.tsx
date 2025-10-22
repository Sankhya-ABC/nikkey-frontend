import AssignmentIcon from "@mui/icons-material/Assignment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";
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
    icon: <PeopleIcon />,
    route: "/clientes",
  },
  {
    name: "Usuários",
    icon: <ManageAccountsIcon />,
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
