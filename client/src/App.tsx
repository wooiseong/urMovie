import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "./router";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

export default App;
