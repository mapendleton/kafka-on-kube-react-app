import React from "react";
import { render } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer Component", function () {
  it("should display footer", function () {
    let { getByTestId } = render(<Footer />);
    expect(getByTestId("footer")).toBeDefined();
  });
});
