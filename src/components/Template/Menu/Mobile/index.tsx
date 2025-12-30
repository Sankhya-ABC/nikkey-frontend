import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Menu } from "@mui/material";
import React from "react";
import { Link } from "react-router";

import nikkeyNameLogo from "/nikkey-name-logo.png";

import { useAuth } from "@/hooks/useAuth";

import { ROUTES } from "../../../../routes";
import { MenuListItems } from "../../MenuListItems";
import { Avatar } from "../components/Avatar";
import { MenuContainer } from "../components/MenuContainer";

export const MenuMobile = () => {
  const { isAuthenticated } = useAuth();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <MenuContainer>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          sx={{ color: ({ palette }) => palette.text.primary }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
            color: ({ palette }) => palette.text.primary,
          }}
        >
          <MenuListItems />
        </Menu>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Link
          to={ROUTES.HOME}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={nikkeyNameLogo}
            alt="Nikkey - Absoluto no Combate"
            height={20}
          />
        </Link>
      </Box>

      {isAuthenticated() && <Avatar />}
    </MenuContainer>
  );
};
