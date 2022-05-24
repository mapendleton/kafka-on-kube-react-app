import React from "react";
import { render } from "@testing-library/react";
import { KafkaContainer } from "./KafkaContainer";

describe("KafkaContainer test suite: ", () => {
  it("should render", () => {
    let { getByTestId } = render(<KafkaContainer />);
    expect(getByTestId("kafka-container")).toBeDefined();
  });
});
