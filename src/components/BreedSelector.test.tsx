import { cleanup, render } from "@testing-library/react";
import BreedSelector from "./BreedSelector";

import "@testing-library/jest-dom";

const setSelectedBreed = jest.fn();

const defaultProps = {
  setSelectedBreed,
  selectedBreed: "",
};

const propsWithBreed = {
  ...defaultProps,
  breed: "bulldog",
  subBreeds: [],
};

const propsWithBreedAndSubBreed = {
  ...propsWithBreed,
  subBreeds: ["boston", "english", "french"],
};

const propsWithBreedAndSubBreedAndSelection = {
  ...propsWithBreed,
  subBreeds: ["boston", "english", "french"],
  selectedBreed:
    propsWithBreedAndSubBreed.breed +
    "/" +
    propsWithBreedAndSubBreed.subBreeds[0],
};

describe("BreedSelector:", () => {
  afterEach(cleanup);

  test("Should render", () => {
    const rendered = render(
      <BreedSelector {...propsWithBreed}></BreedSelector>,
    );

    const el = rendered.getByText(propsWithBreed.breed);

    expect(el).toBeInTheDocument();
  });

  test("Should render with subBreed", () => {
    const rendered = render(
      <BreedSelector {...propsWithBreedAndSubBreed}></BreedSelector>,
    );

    const el = rendered.getByText(
      propsWithBreedAndSubBreed.subBreeds[0] +
        " " +
        propsWithBreedAndSubBreed.breed,
    );

    expect(el).toBeInTheDocument();
  });

  test("Should render with subBreed", () => {
    const rendered = render(
      <BreedSelector {...propsWithBreedAndSubBreed}></BreedSelector>,
    );

    const el = rendered.getByText(
      propsWithBreedAndSubBreed.subBreeds[0] +
        " " +
        propsWithBreedAndSubBreed.breed,
    );

    expect(el).toBeInTheDocument();

    const chips = rendered.queryAllByRole("button");

    expect(chips).toHaveLength(propsWithBreedAndSubBreed.subBreeds.length);
  });

  test("Should render with selected subBreed", () => {
    const rendered = render(
      <BreedSelector
        {...propsWithBreedAndSubBreedAndSelection}
      ></BreedSelector>,
    );

    const el = rendered.getByText(
      propsWithBreedAndSubBreedAndSelection.subBreeds[0] +
        " " +
        propsWithBreedAndSubBreedAndSelection.breed,
    );

    expect(el.getAttribute("aria-selected")).toBeTruthy();
  });
});
