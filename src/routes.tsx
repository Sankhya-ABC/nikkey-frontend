import AssignmentIcon from "@mui/icons-material/Assignment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import TourIcon from "@mui/icons-material/Tour";
import WorkIcon from "@mui/icons-material/Work";
import { ReactNode } from "react";
import { Role } from "./hooks/useAuth";
import { Clientes } from "./pages/Clientes";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { OrdensDeServico } from "./pages/OrdensDeServico";
import { RelatoriosProdutividade } from "./pages/RelatoriosProdutividade";
import { Usuarios } from "./pages/Usuarios";
import { Visitas } from "./pages/Visitas";

interface Routes {
  path: string;
  element: ReactNode;
  isProtected: boolean;
  requiredRole?: Role | Role[];
  requiredAnyRole?: Role[];
  menu?: {
    name: string;
    icon: ReactNode;
  };
}

export const routes: Routes[] = [
  {
    path: "*",
    element: <NotFound />,
    isProtected: false,
  },
  {
    path: "/login",
    element: <Login />,
    isProtected: false,
  },
  {
    path: "/",
    element: <Dashboard />,
    isProtected: true,
    requiredAnyRole: [Role.ADMIN, Role.COMMON],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    isProtected: true,
    requiredAnyRole: [Role.ADMIN, Role.COMMON],
    menu: {
      name: "Dashboard",
      icon: <SignalCellularAltIcon />,
    },
  },
  {
    path: "/Clientes",
    element: <Clientes />,
    isProtected: true,
    requiredRole: [Role.ADMIN],
    menu: {
      name: "Clientes",
      icon: <PeopleIcon />,
    },
  },
  {
    element: <Usuarios />,
    path: "/usuarios",
    isProtected: true,
    requiredAnyRole: [Role.ADMIN, Role.COMMON],
    menu: {
      name: "Usuários",
      icon: <ManageAccountsIcon />,
    },
  },
  {
    path: "/visitas",
    element: <Visitas />,
    isProtected: true,
    requiredAnyRole: [Role.ADMIN, Role.COMMON],
    menu: {
      name: "Visitas",
      icon: <TourIcon />,
    },
  },
  {
    path: "/ordens-de-servico",
    element: <OrdensDeServico />,
    isProtected: true,
    requiredAnyRole: [Role.ADMIN, Role.COMMON],
    menu: {
      name: "Ordens de Serviço",
      icon: <WorkIcon />,
    },
  },
  {
    path: "/relatorio-de-produtividade",
    element: <RelatoriosProdutividade />,
    isProtected: true,
    requiredRole: [Role.ADMIN],
    menu: {
      name: "Relatório de Produtividade",
      icon: <AssignmentIcon />,
    },
  },
];
