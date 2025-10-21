import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router";
import { Drawer } from "./Drawer";
import { Menu } from "./Menu";

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  top: 64,
  position: "relative",
  minHeight: "calc(100vh - 64px)",
}));

export const Template = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Menu />

      <Drawer />

      <Main>
        <Outlet />
      </Main>
    </Box>
  );
};
