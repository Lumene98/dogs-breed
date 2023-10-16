import { cleanup, render } from "@testing-library/react";
import Modal from "./Modal";

import "@testing-library/jest-dom";
import { click } from "@testing-library/user-event/dist/click";

describe("Modal:", () => {
  afterEach(cleanup);

  const closeFn = jest.fn();

  test("Should render", () => {
    const rendered = render(
      <Modal open={true} setOpen={() => {}}>
        <div>Hello</div>
      </Modal>,
    );

    const el = rendered.getByText("Hello");

    expect(el).toBeInTheDocument();
  });

  test("Should not render", () => {
    const rendered = render(
      <Modal open={false} setOpen={() => {}}>
        <div>Hello</div>
      </Modal>,
    );

    const el = rendered.queryByText("Hello");

    expect(el).toBeNull();
  });

  test("Should close", () => {
    const rendered = render(
      <Modal open={true} setOpen={closeFn}>
        <div>Hello</div>
      </Modal>,
    );

    const el = rendered.getByText("Hello");

    expect(el).toBeInTheDocument();

    const closeButton = rendered.getByText("Close");

    click(closeButton);

    expect(closeFn).toHaveBeenCalledWith(false);
  });
});
