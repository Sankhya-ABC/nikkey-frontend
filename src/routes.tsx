import DescriptionIcon from "@mui/icons-material/Description";
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
import { RelatorioConsumoDeProdutos } from "./pages/Relatorios/ConsumoDeProdutos";
import { RelatorioConsumoDeInsumos } from "./pages/Relatorios/ConsumoDeInsumos";
import { RelatorioFocoPragasEncontradas } from "./pages/Relatorios/FocoPragasEncontradas";

interface Routes {
  path: string;
  element: ReactNode;
  isProtected: boolean;
  requiredRole?: Role | Role[];
  requiredAnyRole?: Role[];
  menu?: {
    name: string;
    icon: ReactNode;
    parent?: string;
  };
}

export enum ROUTES {
  // Portal Routes
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

  // Relatórios
  RELATORIO_CONSUMO_PRODUTOS = "/relatorios/consumo-produtos",
  RELATORIO_CONSUMO_INSUMOS = "/relatorios/consumo-insumos",
  RELATORIO_FOCO_PRAGAS = "/relatorios/foco-pragas",
  RELATORIO_INSETICIDAS_PRAGAS = "/relatorios/inseticidas-pragas",
  RELATORIO_ARMADILHAS_FEROMONIOS = "/relatorios/armadilhas-feromonios",
  RELATORIO_ARMADILHAS_LUMINOSAS = "/relatorios/armadilhas-luminosas",
  RELATORIO_ROEDORES_MORTOS = "/relatorios/roedores-mortos",
  RELATORIO_PLACA_COLA = "/relatorios/placa-cola",
  RELATORIO_ISCAS_ROIDAS = "/relatorios/iscas-roidas",
  RELATORIO_RODENTICIDAS_ROEDORES = "/relatorios/rodenticidas-roedores",
  RELATORIO_NAO_CONFORMIDADES = "/relatorios/nao-conformidades",
  RELATORIO_CERTIFICADOS = "/relatorios/certificados",
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
  {
    path: "#",
    element: null,
    isProtected: true,
    requiredRole: [Role.COMMON],
    menu: {
      name: "Relatórios",
      icon: <DescriptionIcon />,
    },
  },
  {
    path: ROUTES.RELATORIO_CONSUMO_PRODUTOS,
    element: <RelatorioConsumoDeProdutos />,
    isProtected: true,
    requiredRole: [Role.COMMON],
    menu: {
      name: "Consumo de Produtos",
      icon: <DescriptionIcon />,
      parent: "Relatórios",
    },
  },
  {
    path: ROUTES.RELATORIO_CONSUMO_INSUMOS,
    element: <RelatorioConsumoDeInsumos />,
    isProtected: true,
    requiredRole: [Role.COMMON],
    menu: {
      name: "Consumo de Insumos",
      icon: <DescriptionIcon />,
      parent: "Relatórios",
    },
  },
  {
    path: ROUTES.RELATORIO_FOCO_PRAGAS,
    element: <RelatorioFocoPragasEncontradas />,
    isProtected: true,
    requiredRole: [Role.COMMON],
    menu: {
      name: "Foco/Pragas encontradas",
      icon: <DescriptionIcon />,
      parent: "Relatórios",
    },
  },
  {
    path: ROUTES.RELATORIO_INSETICIDAS_PRAGAS,
    element: <span>RELATORIO_INSETICIDAS_PRAGAS</span>,
    isProtected: true,
    requiredRole: [Role.COMMON],
    menu: {
      name: "Inseticidas X Pragas",
      icon: <DescriptionIcon />,
      parent: "Relatórios",
    },
  },
  {
    path: ROUTES.RELATORIO_ARMADILHAS_FEROMONIOS,
    element: <span>RELATORIO_ARMADILHAS_FEROMONIOS</span>,
    isProtected: true,
    requiredRole: [Role.COMMON],
    menu: {
      name: "Armadilhas de Feromônios",
      icon: <DescriptionIcon />,
      parent: "Relatórios",
    },
  },
  {
    path: ROUTES.RELATORIO_ARMADILHAS_LUMINOSAS,
    element: <span>RELATORIO_ARMADILHAS_LUMINOSAS</span>,
    isProtected: true,
    requiredRole: [Role.COMMON],
    menu: {
      name: "Armadilhas Luminosas",
      icon: <DescriptionIcon />,
      parent: "Relatórios",
    },
  },
  {
    path: ROUTES.RELATORIO_ROEDORES_MORTOS,
    element: <span>RELATORIO_ROEDORES_MORTOS</span>,
    isProtected: true,
    requiredRole: [Role.COMMON],
    menu: {
      name: "Roedores Mortos",
      icon: <DescriptionIcon />,
      parent: "Relatórios",
    },
  },
  {
    path: ROUTES.RELATORIO_PLACA_COLA,
    element: <span>RELATORIO_PLACA_COLA</span>,
    isProtected: true,
    requiredRole: [Role.COMMON],
    menu: {
      name: "Placa de Cola/Armadilha Mecânica",
      icon: <DescriptionIcon />,
      parent: "Relatórios",
    },
  },
  {
    path: ROUTES.RELATORIO_ISCAS_ROIDAS,
    element: <span>RELATORIO_ISCAS_ROIDAS</span>,
    isProtected: true,
    requiredRole: [Role.COMMON],
    menu: {
      name: "Iscas Roídas",
      icon: <DescriptionIcon />,
      parent: "Relatórios",
    },
  },
  {
    path: ROUTES.RELATORIO_RODENTICIDAS_ROEDORES,
    element: <span>RELATORIO_RODENTICIDAS_ROEDORES</span>,
    isProtected: true,
    requiredRole: [Role.COMMON],
    menu: {
      name: "Rodenticidas x Roedores",
      icon: <DescriptionIcon />,
      parent: "Relatórios",
    },
  },
  {
    path: ROUTES.RELATORIO_NAO_CONFORMIDADES,
    element: <span>RELATORIO_NAO_CONFORMIDADES</span>,
    isProtected: true,
    requiredRole: [Role.COMMON],
    menu: {
      name: "Não Conformidades",
      icon: <DescriptionIcon />,
      parent: "Relatórios",
    },
  },
  {
    path: ROUTES.RELATORIO_CERTIFICADOS,
    element: <span>RELATORIO_CERTIFICADOS</span>,
    isProtected: true,
    requiredRole: [Role.COMMON],
    menu: {
      name: "Certificados",
      icon: <DescriptionIcon />,
      parent: "Relatórios",
    },
  },
];
