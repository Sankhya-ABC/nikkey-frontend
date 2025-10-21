import { Box } from "@mui/material";

export const Template: React.FC = () => {
  return (
    <Box sx={{ background: "pink" }}>
      <Box sx={{ background: "red", height: 56 }}>Menu</Box>
      <Box
        sx={{
          background: "yellow",
          display: "flex",
          minHeight: "calc(100vh - 56px)",
        }}
      >
        <Box sx={{ background: "green", width: 250 }}>Sidebar</Box>
        <Box sx={{ background: "blue", width: "100%" }}>Content</Box>
      </Box>
    </Box>
  );
};
