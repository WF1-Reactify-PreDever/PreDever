import { useState } from "react";

const usePoints = (initialPoints = 0) => {
  const [points, setPoints] = useState(initialPoints);

  const addPoints = (amount) => setPoints((prev) => prev + amount);
  const subtractPoints = (amount) => setPoints((prev) => prev - amount);

  return { points, addPoints, subtractPoints };
};

export default usePoints;
