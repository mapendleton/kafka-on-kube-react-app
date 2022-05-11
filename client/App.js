import React, { Component } from "react";
import { ThemeProvider } from "@mui/material/styles";
import "./app.css";
import { theme } from "./util/theme";
import { AppContainer } from "./components/common/AppContainer";
import { Routes, Route } from "react-router-dom";
import { KafkaContainer } from "./components/pages/KafkaContainer";

export class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<AppContainer />} />
          <Route path="/kafka" element={<KafkaContainer />} />
        </Routes>
      </ThemeProvider>
    );
  }
}
