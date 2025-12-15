import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

import { useAuth } from "../../../hooks/useAuth";
import { useDrawer } from "../../../hooks/useDrawer";
import { ROUTES, routes } from "../../../routes";

import { DrawerHeader, Drawer as DrawerUI } from "./styles";

export const Drawer = () => {
  const { hasRole, hasAnyRole } = useAuth();
  const { isDrawerOpen, openDrawer, closeDrawer } = useDrawer();
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    const newOpenDropdowns = { ...openDropdowns };

    functionalities.forEach((route) => {
      if (route.menu?.parent) {
        if (isRouteActive(route.path)) {
          newOpenDropdowns[route.menu.parent] = true;
        }
      }
    });

    setOpenDropdowns(newOpenDropdowns);
  }, [location.pathname]);

  const handleDropdownClick = (menuName: string) => {
    if (!isDrawerOpen) {
      openDrawer();
      setOpenDropdowns((prev) => ({
        ...prev,
        [menuName]: true,
      }));
    } else {
      setOpenDropdowns((prev) => ({
        ...prev,
        [menuName]: !prev[menuName],
      }));
    }
  };

  const functionalities = routes?.filter((route) => {
    const shouldDisplayOnMenu = route?.menu !== undefined;
    const hasRequiredRole = route?.requiredRole && hasRole(route?.requiredRole);
    const hasRequiredAnyRole =
      route?.requiredAnyRole && hasAnyRole(route?.requiredAnyRole);

    return shouldDisplayOnMenu && (hasRequiredRole || hasRequiredAnyRole);
  });

  const groupedRoutes: Record<string, any[]> = {};
  const mainRoutes: any[] = [];

  functionalities.forEach((route) => {
    if (route.menu?.parent) {
      if (!groupedRoutes[route.menu.parent]) {
        groupedRoutes[route.menu.parent] = [];
      }
      groupedRoutes[route.menu.parent].push(route);
    } else {
      mainRoutes.push(route);
    }
  });

  const isRouteActive = (routePath: string) => {
    return (
      location.pathname === routePath ||
      (location.pathname === ROUTES.HOME && routePath === ROUTES.DASHBOARD)
    );
  };

  const isRouteOrChildActive = (route: any) => {
    const { path, menu } = route;

    if (isRouteActive(path)) {
      return true;
    }

    if (menu?.name && groupedRoutes[menu.name]) {
      const hasActiveChild = groupedRoutes[menu.name].some((childRoute) =>
        isRouteActive(childRoute.path),
      );
      return hasActiveChild;
    }

    return false;
  };

  const handleMenuItemClick = (isParentItem: boolean, menuName: string) => {
    if (isParentItem) {
      handleDropdownClick(menuName);
      return false;
    }
    return true;
  };

  const renderMenuItem = (route: any, level = 0) => {
    const { menu, path } = route;
    const isSubItem = level > 0;
    const paddingLeft = isSubItem ? 4 : 2.5;
    const isParentItem = groupedRoutes[menu?.name]?.length > 0;
    const isDropdownOpen = openDropdowns[menu?.name] || false;
    const hasSubItems = groupedRoutes[menu?.name]?.some(
      (subRoute) => subRoute.menu?.parent === menu?.name,
    );

    const isActive = isRouteOrChildActive(route);

    return (
      <ListItem disablePadding key={menu?.name}>
        <Tooltip
          title={menu?.name}
          placement="right"
          arrow
          disableHoverListener={isDrawerOpen}
        >
          <ListItemButton
            component={isParentItem ? "button" : Link}
            to={isParentItem ? undefined : path}
            sx={{
              minHeight: 48,
              justifyContent: isDrawerOpen ? "initial" : "center",
              px: paddingLeft,
              pl: isDrawerOpen ? paddingLeft : 2.5,
              backgroundColor: isActive ? "primary.main" : "transparent",
              "&:hover": {
                backgroundColor: isActive ? "primary.dark" : "action.hover",
              },
            }}
            onClick={(e) => {
              if (isParentItem) {
                e.preventDefault();
                handleMenuItemClick(isParentItem, menu?.name);
              }
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isDrawerOpen ? 3 : "auto",
                justifyContent: "center",
                color: isActive ? "primary.contrastText" : "inherit",
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
                color: isActive ? "primary.contrastText" : "inherit",
              }}
            />
            {isParentItem &&
              isDrawerOpen &&
              (hasSubItems ? (
                isDropdownOpen ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null)}
          </ListItemButton>
        </Tooltip>
      </ListItem>
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
        {mainRoutes.map((route) => {
          const hasChildren = groupedRoutes[route.menu?.name]?.length > 0;
          const isDropdownOpen = openDropdowns[route.menu?.name] || false;

          return (
            <div key={route.menu?.name}>
              {renderMenuItem(route)}

              {hasChildren && isDrawerOpen && (
                <Collapse in={isDropdownOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {groupedRoutes[route.menu?.name]?.map((subRoute) => (
                      <div key={subRoute.menu?.name}>
                        {renderMenuItem(subRoute, 1)}
                      </div>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          );
        })}
      </List>
    </DrawerUI>
  );
};
