import { render, screen } from "@testing-library/react";
import Index from "../src/pages/index.tsx";

describe("Index", () => {
  it("renders without crashing", () => {
    const index = render(<Index />);
    expect(index).toBeTruthy();
  });
});