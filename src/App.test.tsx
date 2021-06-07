import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App color="rgb(123,250,220)" testString="Bloop" />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders app logo", () => {
  render(<App color="rgb(123,250,220)" testString="Bloop" />);
  const image = screen.getByAltText(/logo/i);
  expect(image).toBeInTheDocument();
});
