import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router";
import { useDrawer } from "../../../hooks/useDrawer";
import { functionalities } from "./provider";
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
        {functionalities.map(({ name, icon, route }) => (
          <Link
            to={route}
            key={name}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <Tooltip
                title={name}
                placement="right"
                arrow
                disableHoverListener={isDrawerOpen}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isDrawerOpen ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isDrawerOpen ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    sx={{
                      opacity: isDrawerOpen ? 1 : 0,
                      transition: ({ transitions }) =>
                        transitions.create("opacity", {
                          duration: transitions.duration.leavingScreen,
                        }),
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </Link>
        ))}
      </List>
    </DrawerUI>
  );
};
