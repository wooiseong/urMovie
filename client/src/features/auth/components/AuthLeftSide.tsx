import { Box, Typography, Stack } from "@mui/material";
import formCover from "../../../assets/images/formCover.png";
import urMovieLogo from "../../../assets/images/urMovieLogo.png";
import { useTranslation } from "react-i18next";
import MovieIcon from "@mui/icons-material/Movie";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupsIcon from "@mui/icons-material/Groups";

const AuthLeftSide = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <MovieIcon sx={{ fontSize: 24 }} />,
      title: t("auth.features.discover", "Discover Movies"),
    },
    {
      icon: <BookmarkIcon sx={{ fontSize: 24 }} />,
      title: t("auth.features.track", "Track & Journal"),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #34D399 0%, #059669 100%)",
        borderRadius: "10px 0 0 10px",
        padding: "28px 28px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          position: "relative",
          left: "50%",
          transform: "translateX(-16%)",
          zIndex: 1,
          mb: 2,
        }}
      >
        <img
          src={urMovieLogo}
          alt="UrMovie Logo"
          style={{ width: "160px", display: "block" }}
        />
      </Box>

      {/* Hero Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          // gap: 2.5,
        }}
      >
        {/* Main Headline */}
        <Stack spacing={1.5} alignItems="center" textAlign="center">
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: "1.7rem",
              lineHeight: 1.2,
              textShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            {t("auth.hero_title", "Your Personal Movie Universe")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.95)",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              fontSize: "0.95rem",
              maxWidth: "380px",
            }}
          >
            {t(
              "auth.hero_subtitle",
              "Track and discover your cinematic journey"
            )}
          </Typography>
        </Stack>

        {/* Illustration */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 1.5,
          }}
        >
          <img
            src={formCover}
            alt="cover"
            style={{
              width: "55%",
              maxWidth: "230px",
              display: "block",
              filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.2))",
            }}
          />
        </Box>

        {/* Feature List */}
        <Stack spacing={1.5}>
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(10px)",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.18)",
                  transform: "translateX(5px)",
                },
              }}
            >
              <Box
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {feature.icon}
              </Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "white",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                {feature.title}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Footer Quote */}
      <Box sx={{ position: "relative", zIndex: 1, textAlign: "center", mt: 3 }}>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            fontFamily: "Montserrat, sans-serif",
            fontStyle: "italic",
            fontSize: "0.85rem",
          }}
        >
          "{t("auth.tagline", "Every movie tells a story. What's yours?")}"
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthLeftSide;
