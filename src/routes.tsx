import AssignmentIcon from "@mui/icons-material/Assignment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import TourIcon from "@mui/icons-material/Tour";
import WorkIcon from "@mui/icons-material/Work";
import { ReactNode } from "react";
import { Clientes } from "./pages/Clientes";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { RelatoriosProdutividade } from "./pages/RelatoriosProdutividade";
import { Usuarios } from "./pages/Usuarios";
import { Visitas } from "./pages/Visitas";
import { Role } from "./types";
import { CronogramasDeVisitas } from "./pages/CronogramaDeVisitas";
import { OrdensDeServico } from "./pages/OrdensDeServico";
import { Certificados } from "./pages/Certificados";

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

export enum ROUTES {
  NOT_FOUND = "*",
  LOGIN = "/login",
  HOME = "/",
  DASHBOARD = "/dashboard",
  CLIENTES = "/clientes",
  USUARIOS = "/usuarios",
  VISITAS = "/visitas",
  CRONOGRAMA_DE_VISITAS = "/cronograma-de-visitas",
  ORDENS_DE_SERVICO = "/ordens-de-servico",
  CERTIFICADOS = "/certificados",
  RELATORIO_DE_PRODUTIVIDADE = "/relatorio-de-produtividade",
}

export const routes: Routes[] = [
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
    isProtected: false,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
    isProtected: false,
  },
  {
    path: ROUTES.HOME,
    element: <Dashboard />,
    isProtected: true,
    requiredAnyRole: [Role.ADMIN, Role.COMMON],
  },
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
    isProtected: true,
    requiredAnyRole: [Role.ADMIN, Role.COMMON],
    menu: {
      name: "Dashboard",
      icon: <SignalCellularAltIcon />,
    },
  },
  {
    path: ROUTES.CLIENTES,
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
    path: ROUTES.USUARIOS,
    isProtected: true,
    requiredAnyRole: [Role.ADMIN, Role.COMMON],
    menu: {
      name: "Usuários",
      icon: <ManageAccountsIcon />,
    },
  },
  {
    path: ROUTES.VISITAS,
    element: <Visitas />,
    isProtected: true,
    requiredAnyRole: [Role.ADMIN],
    menu: {
      name: "Visitas",
      icon: <TourIcon />,
    },
  },
  {
    path: ROUTES.CRONOGRAMA_DE_VISITAS,
    element: <CronogramasDeVisitas />,
    isProtected: true,
    requiredAnyRole: [Role.COMMON],
    menu: {
      name: "Cronograma de Visitas",
      icon: <TourIcon />,
    },
  },
  {
    path: ROUTES.ORDENS_DE_SERVICO,
    element: <OrdensDeServico />,
    isProtected: true,
    requiredAnyRole: [Role.ADMIN, Role.COMMON],
    menu: {
      name: "Ordens de Serviço",
      icon: <WorkIcon />,
    },
  },
  {
    path: ROUTES.CERTIFICADOS,
    element: <Certificados />,
    isProtected: true,
    requiredAnyRole: [Role.COMMON],
    menu: {
      name: "Certificados",
      icon: <WorkIcon />,
    },
  },
  {
    path: ROUTES.RELATORIO_DE_PRODUTIVIDADE,
    element: <RelatoriosProdutividade />,
    isProtected: true,
    requiredRole: [Role.ADMIN],
    menu: {
      name: "Relatório de Produtividade",
      icon: <AssignmentIcon />,
    },
  },
];
