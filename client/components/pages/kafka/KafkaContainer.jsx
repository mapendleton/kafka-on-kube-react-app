import React from "react";
import { Container } from "@mui/material";

import { Header } from "../../common/Header";
import { Footer } from "../../common/Footer";
import { Kafka } from "./Kafka";

export function KafkaContainer() {
  return (
    <>
      <Header />
      <Container data-testid="kafka-container" maxWidth={"lg"}>
        <Kafka />
      </Container>
      <Footer />
    </>
  );
}
