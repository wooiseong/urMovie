import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface FullScreenLoaderProps {
  text?: string;
}
const FullScreenLoader = ({ text }: FullScreenLoaderProps) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        // bgcolor: "rgba(11, 10, 10, 0.7)",
        zIndex: 1350,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 8,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.paper",
          position: "relative",
        }}
      >
        <CircularProgress size={180} sx={{ color: "primary.main" }} />

        <Typography
          fontSize="20px"
          sx={{
            position: "absolute",
            textAlign: "center",
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          {text ?? t("operation.loading")}
        </Typography>
      </Paper>
    </Box>
  );
};

export default FullScreenLoader;
