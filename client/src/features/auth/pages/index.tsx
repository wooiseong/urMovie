import Box from "@mui/material/Box";
import AuthLeftSide from "../components/AuthLeftSide";

import AuthRightSide from "../components/AuthRightSide";
import { useState } from "react";
import { Grid } from "@mui/material";

type Mode = "login" | "register";

const AuthPage = () => {
  const [currentMode, setCurrentMode] = useState<Mode>("login");

  return (
    <Box
      display="flex"
      width="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 3, md: 4 },
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: "1200px",
          width: "100%",
          backgroundColor: "background.paper",
          borderRadius: { xs: 2, md: 3 },
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <AuthLeftSide />
        </Grid>
        <Grid item xs={12} md={6} sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
          <AuthRightSide mode={currentMode} setCurrentMode={setCurrentMode} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthPage;
