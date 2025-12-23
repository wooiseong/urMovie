import { Box, Typography } from "@mui/material";
import formCover from "../../../assets/images/formCover.png";
import urMovieLogo from "../../../assets/images/urMovieLogo.png";
import { useTranslation } from "react-i18next";

const AuthLeftSide = () => {
  const { t } = useTranslation();
  return (
    <Box
      bgcolor="#1B5CD8"
      borderRadius="10px"
      width="100%"
      height="100%"
      padding="10px"
      boxSizing="border-box"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        color="white"
      >
        <Box
          width="100%"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60px",
          }}
        >
          <img
            src={urMovieLogo}
            alt="UrMovie Logo"
            style={{ width: "200px", marginTop: "15px", display: "block" }}
          />
        </Box>

        <Box width="100%">
          <img
            src={formCover}
            alt="cover"
            style={{ width: "90%", display: "block", margin: "0 auto" }}
          />
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={2} mr={2} color="white">
        <Typography
          variant="subtitle1"
          sx={{ fontFamily: "Montserrat, sans-serif", color: "#F5F5DC" }}
        >
          {t("auth.create_your_movielist")}
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthLeftSide;
