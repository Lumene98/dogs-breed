import { cleanup, render, waitFor } from "@testing-library/react";
import App from "./App";

import "@testing-library/jest-dom";
import { click } from "@testing-library/user-event/dist/click";
import { breedsResponse, server } from "util/mocks";

const intersectionObserverMock = {
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
};

describe("App:", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });
  afterAll(() => server.close());

  beforeEach(() => {
    // @ts-expect-error No need to test infinite scroll in this case
    global.IntersectionObserver = jest.fn(() => {
      return intersectionObserverMock;
    });
  });

  test("Should render", async () => {
    const rendered = render(<App />);

    const el = rendered.getByText("Filter");

    expect(el).toBeInTheDocument();

    await waitFor(() => {
      expect(rendered.queryAllByRole("img")).toHaveLength(2);
    });
  });

  test("Should render and select a filter", async () => {
    const rendered = render(<App />);

    await waitFor(() => {
      // Check if all the images are there
      expect(rendered.queryAllByRole("img")).toHaveLength(2);
    });

    // Click filter button
    const filterButton = rendered.getByText("Filter");

    await waitFor(() => {
      click(filterButton);
    });

    await waitFor(() => {
      // Make sure modal is on the DOM
      expect(rendered.getByText("Choose breed")).toBeInTheDocument();
    });

    // Find and click mocked breed chip
    const deerhoundBreedChip = rendered.getByText(
      breedsResponse.message.deerhound[0] + " deerhound",
    );

    await waitFor(() => {
      click(deerhoundBreedChip);
    });

    await waitFor(() => {
      expect(deerhoundBreedChip.getAttribute("aria-selected")).toBeTruthy();
    });

    // Close modal
    const closeButton = rendered.getByText("Close");

    await waitFor(() => {
      click(closeButton);
    });

    await waitFor(() => {
      expect(closeButton).not.toBeInTheDocument();
    });

    await waitFor(() => {
      const images = rendered.queryAllByRole("img");
      expect(images).toHaveLength(1);
      expect(images[0].getAttribute("src")).toContain("deerhound");
    });
  });
});
