import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBarWrapper from "src/globalComponents/navBar/NavBarWrapper";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBarWrapper />
      <Box
        component="main"
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 64px)",
          flex: 1,
          py: { xs: 2, md: 3 },
        }}
      >
        <Grid container>
          {/* Left spacing - only visible on lg and above */}
          <Grid item lg={1} sx={{ display: { xs: "none", lg: "block" } }} />

          {/* Main content */}
          <Grid
            item
            xs={12}
            lg={10}
            sx={{
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Outlet />
          </Grid>

          {/* Right spacing - only visible on lg and above */}
          <Grid item lg={1} sx={{ display: { xs: "none", lg: "block" } }} />
        </Grid>
      </Box>
    </Box>
  );
};

export default MainLayout;
