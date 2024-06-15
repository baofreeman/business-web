import { useEffect, useState } from "react";

const usePersist = () => {
  const persistLocalStorage = JSON.parse(localStorage.getItem("persist"));
  const [persist, setPerSist] = useState(persistLocalStorage || false);
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);
  return [persist, setPerSist];
};

export default usePersist;
