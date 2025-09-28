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
      bgcolor="#282828"
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Grid
        container
        sx={{
          height: "90%",
          width: "80%",
          backgroundColor: "#eee",
          borderRadius: "10px",
        }}
        p={3}
      >
        <Grid item xs={12} md={6}>
          <AuthLeftSide />
        </Grid>
        <Grid item xs={12} md={6}>
          <AuthRightSide mode={currentMode} setCurrentMode={setCurrentMode} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthPage;
