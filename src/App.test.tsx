import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

import App from "./App";

const mockData = {
  customers: [
    {
      id: 120911,
      name: "A Customer",
      email: "customer@email.com",
      channel: "website",
      address: "12 Main St.",
      postal: "M1M 1M1",
      city: "Toronto",
      province: "ON",
      country: "CA",
    },
    {
      id: 146633,
      name: "Another Customer",
      email: "customer2@email.com",
      channel: "phone",
      address: "12 Yonge St. #23",
      postal: "M2M 2M2",
      city: "Toronto",
      province: "ON",
      country: "CA",
    },
    {
      id: 171981,
      name: "A Great Customer",
      email: "customerplusplus@email.com",
      channel: "email",
      address: "2312 Eglinton Ave.",
      postal: "M3M 3M3",
      city: "Toronto",
      province: "ON",
      country: "CA",
    },
  ],
};

const customersApi =
  "https://rawgit.com/wvchallenges/se-exp-challenge-invoice/master/settings.json";

const server = setupServer(
  rest.get(customersApi, (req, res, ctx) => {
    return res(ctx.json(mockData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders loading state prior to fetching data", () => {
  server.use(
    rest.get(customersApi, (req, res, ctx) => {
      return res(ctx.json(mockData));
    })
  );
  render(<App />);
  const loadingMessage = screen.queryByText("loading...");
  expect(loadingMessage).toBeInTheDocument();
});

test("does not render loading state after fetching data", async () => {
  server.use(
    rest.get(customersApi, (req, res, ctx) => {
      return res(ctx.json(mockData));
    })
  );
  render(<App />);
  await waitForElementToBeRemoved(screen.queryByText("loading..."));
  expect(screen.queryByText("loading...")).not.toBeInTheDocument();
});

test("renders server error", async () => {
  server.use(
    rest.get(customersApi, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<App />);
  await waitForElementToBeRemoved(screen.queryByText("loading..."));
  await waitFor(() => screen.getByTestId("serverError"));
  expect(screen.getByTestId("serverError")).toBeInTheDocument();
});

test("renders all editable customer rows on load", async () => {
  server.use(
    rest.get(customersApi, (req, res, ctx) => {
      return res(ctx.json(mockData));
    })
  );
  render(<App />);
  await waitForElementToBeRemoved(screen.queryByText("loading..."));
  const editButtons = await screen.getAllByTestId("editCustomerBtn");
  expect(editButtons.length).toEqual(mockData.customers.length);
});

test("populates customer edit modal form with customer name", async () => {
  render(<App />);
  await waitForElementToBeRemoved(screen.queryByText("loading..."));
  const btns = await screen.getAllByTestId("editCustomerBtn");
  btns.forEach((btn, i) => {
    userEvent.click(btn);
    expect(screen.getByLabelText("name")).toHaveValue(
      mockData.customers[i].name
    );
  });
});

test("populates customer edit modal form with customer email", async () => {
  render(<App />);
  await waitForElementToBeRemoved(screen.queryByText("loading..."));
  const btns = await screen.getAllByTestId("editCustomerBtn");
  btns.forEach((btn, i) => {
    userEvent.click(btn);
    expect(screen.getByLabelText("email")).toHaveValue(
      mockData.customers[i].email
    );
  });
});

test("populates customer edit modal form with customer channel", async () => {
  render(<App />);
  await waitForElementToBeRemoved(screen.queryByText("loading..."));
  const btns = await screen.getAllByTestId("editCustomerBtn");
  btns.forEach((btn, i) => {
    userEvent.click(btn);
    expect(screen.getByLabelText("channel")).toHaveValue(
      mockData.customers[i].channel
    );
  });
});

test("populates customer edit modal form with customer address", async () => {
  render(<App />);
  await waitForElementToBeRemoved(screen.queryByText("loading..."));
  const btns = await screen.getAllByTestId("editCustomerBtn");
  btns.forEach((btn, i) => {
    userEvent.click(btn);
    expect(screen.getByLabelText("address")).toHaveValue(
      mockData.customers[i].address
    );
  });
});

test("populates customer edit modal form with customer city", async () => {
  render(<App />);
  await waitForElementToBeRemoved(screen.queryByText("loading..."));
  const btns = await screen.getAllByTestId("editCustomerBtn");
  btns.forEach((btn, i) => {
    userEvent.click(btn);
    expect(screen.getByLabelText("city")).toHaveValue(
      mockData.customers[i].city
    );
  });
});
test("populates customer edit modal form with customer postal", async () => {
  render(<App />);
  await waitForElementToBeRemoved(screen.queryByText("loading..."));
  const btns = await screen.getAllByTestId("editCustomerBtn");
  btns.forEach((btn, i) => {
    userEvent.click(btn);
    expect(screen.getByLabelText("postal")).toHaveValue(
      mockData.customers[i].postal
    );
  });
});

test("populates customer edit modal form with customer province", async () => {
  render(<App />);
  await waitForElementToBeRemoved(screen.queryByText("loading..."));
  const btns = await screen.getAllByTestId("editCustomerBtn");
  btns.forEach((btn, i) => {
    userEvent.click(btn);
    expect(screen.getByLabelText("province")).toHaveValue(
      mockData.customers[i].province
    );
  });
});
