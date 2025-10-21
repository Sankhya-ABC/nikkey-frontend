import { Box } from "@mui/material";
import { Menu } from "./Menu";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router";

export const Template: React.FC = () => {
  return (
    <Box>
      <Box sx={{ height: 64 }}>
        <Menu onThemeToggle={() => {}} isDarkMode={false} />
      </Box>
      <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        <Box sx={{ width: 300 }}>
          <Sidebar />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
