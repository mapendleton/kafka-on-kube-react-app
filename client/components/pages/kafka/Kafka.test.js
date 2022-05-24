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

  it("should allow a user to check if they would like to consume messages", async () => {
    const { container, getByTestId, getByRole } = render(<Kafka />);

    let checkboxTypeElement = await getByRole("checkbox");
    expect(checkboxTypeElement.checked).toBe(false);

    const result = await fireEvent.click(checkboxTypeElement, {
      target: { value: "test" }
    });
    expect(checkboxTypeElement.checked).toBe(true);
  });

  it("should display fetched messages on an interval once the consume messages checkbox is checked", async () => {
    const { container, getByText, getByRole } = render(<Kafka />);

    let checkboxTypeElement = await getByRole("checkbox");
    expect(checkboxTypeElement.checked).toBe(false);

    const result = await fireEvent.click(checkboxTypeElement, {
      target: { value: "test" }
    });
    expect(checkboxTypeElement.checked).toBe(true);

    await new Promise((r) => setTimeout(r, 2500));
    const consumerDisplayElement = getByText("Consumed Messages");
    expect(consumerDisplayElement).toBeDefined();
  });
});
