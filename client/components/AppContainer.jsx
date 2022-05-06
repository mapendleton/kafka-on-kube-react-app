import { Container, Grid } from "@mui/material";
import { Footer } from "./common/Footer";
import React, { Component } from "react";
import { Header } from "./common/Header";

export class AppContainer extends Component {
  render() {
    return (
      <>
        <Header />
        <Container maxWidth={"sm"}>
          <Grid container spacing={2}></Grid>
        </Container>
        <Footer />
      </>
    );
  }
}
