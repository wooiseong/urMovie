import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBarWrapper from "src/globalComponents/navBar/NavBarWrapper";

const MainLayout = () => {
  return (
    <div>
      <NavBarWrapper />
      <Box
        component="main"
        sx={{
          maxWidth: "1300px",
          mx: "auto",
          px: 3,
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
};

export default MainLayout;
