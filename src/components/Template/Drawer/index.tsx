import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Divider, List } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import { useDrawer } from "../../../hooks/useDrawer";
import { MenuListItems } from "../MenuListItems";

import { DrawerHeader, Drawer as DrawerUI } from "./styles";

export const Drawer = () => {
  const { isDrawerOpen, openDrawer, closeDrawer } = useDrawer();

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
        <MenuListItems />
      </List>
    </DrawerUI>
  );
};
