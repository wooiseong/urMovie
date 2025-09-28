import { Box, Typography } from "@mui/material";
import formCover from "../../../assets/images/formCover.png";

const AuthLeftSide = () => {
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
        <Typography align="center" variant="h5">
          UrMovie
        </Typography>

        <Box width="100%">
          <img
            src={formCover}
            alt="cover"
            style={{ width: "90%", display: "block", margin: "0 auto" }}
          />
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={2} color="white">
        <Typography variant="subtitle1">打造你的MovieList!</Typography>
      </Box>
    </Box>
  );
};

export default AuthLeftSide;
