import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

import { DRAWER_WIDTH } from "../../Drawer/styles";

interface AppBarProps extends MuiAppBarProps {
  isDrawerOpen: boolean;
  isAuthenticated: boolean;
  isMobile: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "openedAndAuthenticated",
})<AppBarProps>(({ theme, isDrawerOpen, isAuthenticated, isMobile }) => ({
  zIndex: theme.zIndex.drawer + 1,
  height: 64,
  "& .MuiToolbar-root": {
    height: 64,
  },
  boxShadow: `0 1px 0 ${theme.palette.divider}`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isDrawerOpen && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!isDrawerOpen &&
    isAuthenticated && {
      marginLeft: `calc(${theme.spacing(7)} + 1px)`,
      width: `calc(100% - calc(${theme.spacing(7)} + 1px))`,
      [theme.breakpoints.up("md")]: {
        marginLeft: `calc(${theme.spacing(8)} + 1px)`,
        width: `calc(100% - calc(${theme.spacing(8)} + 1px))`,
      },
    }),
  ...(!isAuthenticated && {
    width: "100%",
  }),
  ...(isMobile && {
    marginLeft: 0,
    width: `100%`,
    transition: "none",
  }),
}));
