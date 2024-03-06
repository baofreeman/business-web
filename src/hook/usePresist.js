import { useEffect, useState } from "react";

const usePersist = () => {
  const [persist, setPerSist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);
  return [persist, setPerSist];
};

export default usePersist;
