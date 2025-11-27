import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { Drawer } from "./Drawer";
import { Menu } from "./Menu";
import { StyledAlert } from "./style";
import { ROUTES } from "../../routes";

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  top: 64,
  position: "relative",
  minHeight: "calc(100vh - 64px)",
  display: "block",
}));

export const Template = () => {
  const {
    isAuthenticated,
    isImpersonating,
    getUser,
    stopImpersonating,
    getOriginalUser,
  } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <Menu />

      {isAuthenticated() && <Drawer />}

      <Main>
        {isImpersonating() && (
          <StyledAlert sx={{ mb: 3 }} severity="warning">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                mt: -0.5,
              }}
            >
              <Typography>
                Você está acessando como <strong>{getUser()!.name}</strong>
              </Typography>

              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  stopImpersonating();
                  navigate(ROUTES.CLIENTES);
                }}
                variant="text"
              >
                Retomar acesso como {getOriginalUser()!.name}
              </Button>
            </Box>
          </StyledAlert>
        )}
        <Outlet />
      </Main>
    </Box>
  );
};
