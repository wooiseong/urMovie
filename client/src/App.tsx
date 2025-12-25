import React, { useEffect } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "./router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { store } from "./store";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { useMeQuery } from "./generated/graphql";
import { setUser } from "./store/modules/userSlice";

function App() {
  return (
    <Provider store={store}>
      <AppWithTheme />
    </Provider>
  );
}

function AppWithTheme() {
  const mode = useAppSelector((state) => state.setting.theme);
  const dispatch = useAppDispatch();
  const { data: meData, loading: meLoading } = useMeQuery();

  useEffect(() => {
    if (meData?.me) {
      dispatch(setUser(meData.me));
    }
  }, [meData, dispatch]);

  const theme = React.useMemo(
    () => {
      // Green theme color palette
      const colorPalettes = {
        light: {
          primary: { main: "#2d9d78", light: "#5bc4a0", dark: "#1d7a5c" },
          secondary: { main: "#8b5cf6", dark: "#7c3aed", light: "#a78bfa" },
          accent: { main: "#10b981", light: "#34d399", dark: "#059669" },
        },
        dark: {
          primary: { main: "#34d399", light: "#6ee7b7", dark: "#10b981" },
          secondary: { main: "#fbbf24", dark: "#f59e0b", light: "#fcd34d" },
          accent: { main: "#5eead4", light: "#99f6e4", dark: "#2dd4bf" },
        },
      };

      const selectedPalette = colorPalettes[mode];

      return createTheme({
        palette: {
          mode,
          primary: selectedPalette.primary,
          secondary: selectedPalette.secondary,
          success: {
            main: mode === "light" ? "#3EB380" : "#4ade80",
          },
          error: {
            main: mode === "light" ? "#ef4444" : "#f87171",
          },
          warning: {
            main: mode === "light" ? "#f59e0b" : "#fbbf24",
          },
          info: selectedPalette.accent,
          background: {
            default: mode === "light" ? "#f5f5f5" : "#0a0a0a",
            paper: mode === "light" ? "#ffffff" : "#1a1a1a",
          },
          text: {
            primary: mode === "light" ? "#1a1a1a" : "#f5f5f5",
            secondary: mode === "light" ? "#525252" : "#a3a3a3",
          },
        },
        typography: {
          fontFamily: "'Montserrat', 'Noto Sans', sans-serif",
          button: {
            textTransform: "none",
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 12,
        },
        shadows: [
          "none",
          mode === "light"
            ? "0px 2px 4px rgba(0, 0, 0, 0.05)"
            : "0px 2px 4px rgba(0, 0, 0, 0.3)",
          mode === "light"
            ? "0px 4px 8px rgba(0, 0, 0, 0.08)"
            : "0px 4px 8px rgba(0, 0, 0, 0.4)",
          mode === "light"
            ? "0px 8px 16px rgba(0, 0, 0, 0.1)"
            : "0px 8px 16px rgba(0, 0, 0, 0.5)",
          mode === "light"
            ? "0px 12px 24px rgba(0, 0, 0, 0.12)"
            : "0px 12px 24px rgba(0, 0, 0, 0.6)",
          mode === "light"
            ? "0px 16px 32px rgba(0, 0, 0, 0.15)"
            : "0px 16px 32px rgba(0, 0, 0, 0.7)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
          mode === "light"
            ? "0px 20px 40px rgba(0, 0, 0, 0.18)"
            : "0px 20px 40px rgba(0, 0, 0, 0.8)",
        ],
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 10,
                padding: "8px 20px",
                transition: "all 0.3s ease",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              },
            },
          },
        },
      });
    },
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Toaster position="top-center" />
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

export default App;
