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
    () =>
      createTheme({
        palette: {
          mode,
          // ...(mode === "light"
          //   ? {
          //       background: { default: "#fff" },
          //     }
          //   : {
          //       background: { default: "#121212" },
          //     }),
        },
      }),
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
