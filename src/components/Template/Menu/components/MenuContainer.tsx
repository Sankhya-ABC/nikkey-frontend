import { Toolbar, useMediaQuery, useTheme } from "@mui/material";
import React, { ReactNode } from "react";

import { useDrawer } from "@/hooks/useDrawer";

import { useAuth } from "../../../../hooks/useAuth";

import { AppBar } from "./styles";

interface MenuContainerProps {
  children: ReactNode;
}

export const MenuContainer: React.FC<MenuContainerProps> = ({ children }) => {
  const { isDrawerOpen } = useDrawer();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      isDrawerOpen={isDrawerOpen}
      isAuthenticated={isAuthenticated()}
      isMobile={isMobile}
    >
      <Toolbar sx={{ backgroundColor: "background.paper" }}>{children}</Toolbar>
    </AppBar>
  );
};
