import { useEffect, useRef } from "react";

type DoubleClickHookParams = {
  threshold?: number;
  onDoubleClick: (...args: unknown[]) => void;
};

const DEFAULT_DOUBLE_CLICK_THRESHOLD = 300;

export const useDoubleClick = ({
  threshold = DEFAULT_DOUBLE_CLICK_THRESHOLD,
  onDoubleClick,
}: DoubleClickHookParams) => {
  const updatedDoubleClickFunc = useRef<typeof onDoubleClick>(onDoubleClick);

  useEffect(() => {
    updatedDoubleClickFunc.current = onDoubleClick;
  }, [onDoubleClick]);

  useEffect(() => {
    const detect = detectSecondClick(threshold);
    document.addEventListener("click", detect);

    return () => {
      document.removeEventListener("click", detect);
    };
  }, [threshold]);

  function detectSecondClick(threshold: number) {
    let hasBeenClickedOnce = false;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (_: MouseEvent) => {
      if (!hasBeenClickedOnce) {
        hasBeenClickedOnce = true;
      } else {
        updatedDoubleClickFunc.current();
      }

      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        hasBeenClickedOnce = false;
      }, threshold);
    };
  }
};
