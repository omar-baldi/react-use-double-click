import { useDoubleClick } from "@/hooks/useDoubleClick";
import { fireEvent, render } from "@testing-library/react";
import { vi } from "vitest";

vi.useFakeTimers();

function MockComponentWithDoubleClickHook(props: Parameters<typeof useDoubleClick>[0]) {
  useDoubleClick(props);
  return <div>Mock component</div>;
}

describe("useDoubleClick", () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  it("should not invoke callback function on first click", () => {
    const onDoubleClickFn = vi.fn();
    render(<MockComponentWithDoubleClickHook onDoubleClick={onDoubleClickFn} />);

    fireEvent.click(document);
    expect(onDoubleClickFn).not.toHaveBeenCalled();
  });

  it("should invoke callback function if second click is within threshold", () => {
    const onDoubleClickFn = vi.fn();
    render(<MockComponentWithDoubleClickHook onDoubleClick={onDoubleClickFn} />);

    fireEvent.click(document);
    vi.advanceTimersByTime(200);
    fireEvent.click(document);

    expect(onDoubleClickFn).toHaveBeenCalled();
  });

  it("should not invoke callback function if second click is not within threshold", () => {
    const onDoubleClickFn = vi.fn();
    render(<MockComponentWithDoubleClickHook onDoubleClick={onDoubleClickFn} />);

    fireEvent.click(document);
    vi.advanceTimersByTime(400);
    fireEvent.click(document);

    expect(onDoubleClickFn).not.toHaveBeenCalled();
  });
});
