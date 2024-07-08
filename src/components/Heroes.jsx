import { NavLink, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { sort } from "../utils/sort";
import ErrorBoundary from "./ErrorBoundary";

export function Heroes({ heroes }) {
  const [sortParams, setSortParams] = useSearchParams();
  const [newArray, setNewArray] = useState([]);

  function handleSort(key) {
    setSortParams({ key: key });
    const sortedHeroes = sort(heroes, key);
    setNewArray(sortedHeroes);
  }

  useEffect(() => {
    const sortedHeroes = sort(heroes, sortParams.get("key"));
    setNewArray(sortedHeroes);
  }, [sortParams, heroes]);

  console.log(newArray[0]);

  return (
    <>
      {heroes ? (
        <div className="button__wrapper">
          <button onClick={() => handleSort("ASC")}>по возрастанию</button>
          <button onClick={() => handleSort("DESC")}>по убыванию</button>
        </div>
      ) : (
        <p>Ничего не найдено</p>
      )}
      {newArray?.map((item) => (
        <div key={item.id} className="card__wrapper">
          <div className="items">
            <ErrorBoundary>
              <NavLink to={`/categories/heroes/${item.id}`}>
                <h2>{item.name}</h2>
              </NavLink>
            </ErrorBoundary>
          </div>
        </div>
      ))}
    </>
  );
}
