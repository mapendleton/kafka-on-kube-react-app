import { Container, Grid, Button } from "@mui/material";
import React, { Component } from "react";
import { Header } from "./common/Header";
import { Footer } from "./common/Footer";

export class TestPage extends Component {
  render() {
    return (
      <>
        <Header />
        <Container maxWidth={"md"}>
          <Grid container spacing={4} sx={{ pt: 6 }}>
            <Grid item xs={4}>
              <Button variant={"contained"}>TEST BUTTON</Button>
            </Grid>
            <Grid item xs={4}>
              <p>test paragraph</p>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </>
    );
  }
}
