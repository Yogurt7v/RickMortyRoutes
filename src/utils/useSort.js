import { useState } from "react";
import { Sort } from "../utils/sort";

export function useSort(defaultArray) {
  // eslint-disable-next-line no-unused-vars
  const [sortedArray, setSortedArray] = useState(defaultArray);
  const [newArray, setNewArray] = useState(defaultArray);

  const asc = () => {
    setNewArray(Sort(sortedArray, "ASC"));
  };

  const desc = () => {
    setNewArray(Sort(sortedArray, "DESC"));
  };

  return { newArray, asc, desc };
}
