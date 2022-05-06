import React from "react";
import { render } from "@testing-library/react";
import { Header } from "./Header";

describe("Header Component", function () {
  it("should display header", function () {
    let { getByTestId } = render(<Header />);
    expect(getByTestId("header")).toBeDefined();
  });
});
