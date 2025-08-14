import React from "react";
import { ThemeProvider as MuiStylesThemeProvider } from "@mui/styles";
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import "./App.css";
import { Provider } from "react-redux";
import Layout from "./app/components/layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import { theme } from "./assets/themes/infirmaTheme";
import NewLogin from "./app/components/authorization/loging/NewLogin";




const App = () => {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <MuiStylesThemeProvider theme={theme}>
            <Router>
              <Routes>
                <Route path="/" element={<NewLogin />} />
                <Route path="/alt/*" element={<Layout />} />
              </Routes>
            </Router>
          </MuiStylesThemeProvider>
        </MuiThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
};

export default App;
