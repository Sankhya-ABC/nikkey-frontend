import { Box } from "@mui/material";
import { Menu } from "./Menu";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router";

export const Template: React.FC = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box sx={{ width: 300, minHeight: "100%" }}>
        <Sidebar />
      </Box>
      <Box sx={{ width: "100%", background: "red" }}>
        <Box>
          <Menu onThemeToggle={() => {}} isDarkMode={false} />
        </Box>
        <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
