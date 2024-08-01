import { useCallback, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const useResize = () => {
  const location = useLocation();
  const modelRef = useRef();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const mainRef = useCallback(
    (node) => {
      if (!node) return;
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          setWidth(entry.contentRect.width);
          const heightMd = modelRef.current?.clientHeight;
          if (heightMd && location.pathname.includes("/shop")) {
            setHeight(entry.contentRect.height - heightMd);
          } else {
            setHeight(entry.contentRect.height);
          }
        });
      });
      if (mainRef) {
        return observer.observe(node);
      }
      return () => {
        observer.disconnect();
      };
    },
    [location.pathname]
  );

  return { mainRef, modelRef, width, height };
};

export default useResize;
