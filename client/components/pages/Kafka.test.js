import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Kafka } from "./Kafka";

describe("Kafka component test suite: ", () => {
  it("should render the producer and consumer demos", () => {
    const { getByTestId } = render(<Kafka />);
    expect(getByTestId("producer")).toBeDefined();
    expect(getByTestId("consumer")).toBeDefined();
  });

  it("should display messages when user submits a them", async () => {
    const { container, getByTestId, findByText } = render(<Kafka />);
    const textFieldElement = container.querySelector("#producer-message");
    await fireEvent.change(textFieldElement, {
      target: { value: "test-message-1" }
    });
    const buttonElement = getByTestId("submit-message-button");
    await fireEvent.click(buttonElement);

    await fireEvent.change(textFieldElement, {
      target: { value: "test-message-2" }
    });
    await fireEvent.click(buttonElement);

    expect(await findByText("test-message-1")).toBeDefined();
    expect(await findByText("test-message-2")).toBeDefined();
  });

  it("should display messages when a user hits enter after adding text", async () => {
    const { container, findByText } = render(<Kafka />);
    const textFieldElement = container.querySelector("#producer-message");
    await fireEvent.change(textFieldElement, { target: { value: "tacos" } });
    await fireEvent.keyPress(textFieldElement, { key: "Enter", charCode: 13 });

    expect(await findByText("tacos")).toBeDefined();
  });

  it("should display a success or failure message when submitting a message", async () => {
    const { container, findByTestId } = render(<Kafka />);
    const textFieldElement = container.querySelector("#producer-message");
    await fireEvent.change(textFieldElement, { target: { value: "pizza" } });
    await fireEvent.keyPress(textFieldElement, { key: "Enter", charCode: 13 });

    expect(await findByTestId("alert-success")).toBeDefined();
  });
});
