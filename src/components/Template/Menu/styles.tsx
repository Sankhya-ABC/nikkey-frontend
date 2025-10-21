import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH } from "../Drawer/styles";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  height: 64,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
    width: `calc(100% - calc(${theme.spacing(7)} + 1px))`,
    [theme.breakpoints.up("sm")]: {
      marginLeft: `calc(${theme.spacing(8)} + 1px)`,
      width: `calc(100% - calc(${theme.spacing(8)} + 1px))`,
    },
  }),
}));
