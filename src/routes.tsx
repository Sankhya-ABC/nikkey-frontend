import ArticleIcon from "@mui/icons-material/Article";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import TourIcon from "@mui/icons-material/Tour";
import WorkIcon from "@mui/icons-material/Work";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { ReactNode } from "react";
import { Certificados } from "./pages/Certificados";
import { Clientes } from "./pages/Clientes";
import { CronogramasDeVisitas } from "./pages/CronogramaDeVisitas";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { OrdensDeServico } from "./pages/OrdensDeServico";
import { RelatoriosProdutividade } from "./pages/RelatoriosProdutividade";
import { Usuarios } from "./pages/Usuarios";
import { Visitas } from "./pages/Visitas";
import { Role } from "./types";

interface Routes {
  path?: string;
  element?: ReactNode | Routes[];
  isProtected: boolean;
  requiredRole?: Role | Role[];
  requiredAnyRole?: Role[];
  menu?: {
    name: string;
    icon: ReactNode;
    isDropdown?: boolean;
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
    isProtected: true,
    requiredAnyRole: [Role.COMMON],
    menu: {
      name: "Relatórios",
      icon: <ArticleIcon />,
      isDropdown: true,
    },
  },
  {
    path: ROUTES.CERTIFICADOS,
    element: <Certificados />,
    isProtected: true,
    requiredAnyRole: [Role.COMMON],
    menu: {
      name: "Certificados",
      icon: <WorkspacePremiumIcon />,
    },
  },
  {
    path: ROUTES.RELATORIO_DE_PRODUTIVIDADE,
    element: <RelatoriosProdutividade />,
    isProtected: true,
    requiredRole: [Role.ADMIN],
    menu: {
      name: "Relatório de Produtividade",
      icon: <ShowChartIcon />,
    },
  },
];
