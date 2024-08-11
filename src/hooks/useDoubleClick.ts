/* eslint-disable */
import { useEffect } from "react";

const DEFAULT_DOUBLE_CLICK_THRESHOLD = 300;

export const useDoubleClick = () => {
  function detectSecondClick(threshold = DEFAULT_DOUBLE_CLICK_THRESHOLD) {
    let hasBeenClickedOnce = false;

    return (_: MouseEvent) => {
      if (!hasBeenClickedOnce) {
        hasBeenClickedOnce = true;
      } else {
        console.log("clicked");
      }

      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        hasBeenClickedOnce = false;
      }, threshold);
    };
  }

  useEffect(() => {
    const detect = detectSecondClick();
    document.addEventListener("click", detect);

    return () => {
      document.removeEventListener("click", detect);
    };
  }, []);
};
