import { Container, Grid } from "@mui/material";
import { Footer } from "./Footer";
import React from "react";
import { Header } from "./Header";

export const AppContainer = () => {
  return (
    <>
      <Header />
      <Container maxWidth={"sm"}>
        <Grid container spacing={2}></Grid>
      </Container>
      <Footer />
    </>
  );
};
