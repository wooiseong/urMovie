import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBarWrapper from "src/globalComponents/navBar/NavBarWrapper";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBarWrapper />
      <Box
        component="main"
        sx={{
          maxWidth: "1400px",
          width: "100%",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, md: 3 },
          minHeight: "calc(100vh - 64px)",
          flex: 1,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
