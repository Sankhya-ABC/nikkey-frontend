import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router";
import { Drawer } from "./Drawer";
import { Menu } from "./Menu";
import { useAuth } from "../../hooks/useAuth";

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  top: 64,
  position: "relative",
  minHeight: "calc(100vh - 64px)",
  display: "block",
}));

export const Template = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Box sx={{ display: "flex" }}>
      <Menu />

      {isAuthenticated() && <Drawer />}

      <Main>
        <Outlet />
      </Main>
    </Box>
  );
};
