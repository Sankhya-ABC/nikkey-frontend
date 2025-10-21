import React, { useState, type ReactNode } from "react";
import { Box, Toolbar, useTheme, useMediaQuery } from "@mui/material";
import AppHeader from "./AppHeader";
import AppDrawer from "./AppDrawer";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppHeader onDrawerToggle={handleDrawerToggle} drawerOpen={drawerOpen} />

      <AppDrawer
        open={drawerOpen}
        onDrawerClose={handleDrawerClose}
        drawerWidth={drawerWidth}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
