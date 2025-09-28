import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "./router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

export default App;
