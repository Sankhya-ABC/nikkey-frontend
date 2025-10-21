import { Box } from "@mui/material";
import { Menu } from "./components/Menu";
import { Sidebar } from "./components/Sidebar";

export const App = () => {
  return (
    <Box>
      <Menu />
      <Sidebar />
    </Box>
  );
};
