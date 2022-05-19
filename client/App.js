import React, { Component } from "react";
import { ThemeProvider } from "@mui/material/styles";
import "./app.css";
import { theme } from "./util/theme";
import { Routes, Route } from "react-router-dom";
import { KafkaContainer } from "./components/pages/kafka/KafkaContainer";

export class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<KafkaContainer />} />
          <Route path="/kafka" element={<KafkaContainer />} />
        </Routes>
      </ThemeProvider>
    );
  }
}
