import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation } from "react-router";
import { useDrawer } from "../../../hooks/useDrawer";
import { DrawerHeader, Drawer as DrawerUI } from "./styles";
import { routes } from "../../../routes";
import { useAuth } from "../../../hooks/useAuth";

export const Drawer = () => {
  const { hasRole, hasAnyRole } = useAuth();
  const { isDrawerOpen, openDrawer, closeDrawer } = useDrawer();
  const location = useLocation();

  const functionalities = routes?.filter((route) => {
    const shouldDisplayOnMenu = route?.menu !== undefined;
    const hasRequiredRole = route?.requiredRole && hasRole(route?.requiredRole);
    const hasRequiredAnyRole =
      route?.requiredAnyRole && hasAnyRole(route?.requiredAnyRole);

    return shouldDisplayOnMenu && (hasRequiredRole || hasRequiredAnyRole);
  });

  const isActive = (route) => {
    return (
      location.pathname === route ||
      (location.pathname === "/" && route === "/dashboard")
    );
  };

  return (
    <DrawerUI variant="permanent" open={isDrawerOpen}>
      <DrawerHeader
        sx={
          !isDrawerOpen
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
            : null
        }
      >
        <IconButton onClick={isDrawerOpen ? closeDrawer : openDrawer}>
          {isDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List sx={{ padding: 0 }}>
        {functionalities.map(({ menu, path }) => (
          <Link
            to={path}
            key={menu?.name}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <Tooltip
                title={menu?.name}
                placement="right"
                arrow
                disableHoverListener={isDrawerOpen}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isDrawerOpen ? "initial" : "center",
                    px: 2.5,
                    backgroundColor: isActive(path)
                      ? "primary.main"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: isActive(path)
                        ? "primary.dark"
                        : "action.hover",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isDrawerOpen ? 3 : "auto",
                      justifyContent: "center",
                      color: isActive(path)
                        ? "primary.contrastText"
                        : "inherit",
                    }}
                  >
                    {menu?.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menu?.name}
                    sx={{
                      opacity: isDrawerOpen ? 1 : 0,
                      transition: ({ transitions }) =>
                        transitions.create("opacity", {
                          duration: transitions.duration.leavingScreen,
                        }),
                      color: isActive(path)
                        ? "primary.contrastText"
                        : "inherit",
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </Link>
        ))}
      </List>
    </DrawerUI>
  );
};
