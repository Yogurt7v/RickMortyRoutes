import { NavLink, useSearchParams } from "react-router-dom";
import heroes from "../data-base/characters.json";
import { useState, useEffect } from "react";
import { sort } from "../utils/sort";

export function Heroes() {
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
  }, [sortParams]);

  return (
    <>
      <div className="button__wrapper">
        <button onClick={() => handleSort("ASC")}>по возрастанию</button>
        <button onClick={() => handleSort("DESC")}>по убыванию</button>
      </div>
      {newArray?.map((item) => (
        <div key={item.id} className="card__wrapper">
          <div className="items">
            <NavLink to={`/categories/heroes/${item.id}`}>
              <h2>{item.name}</h2>
            </NavLink>
          </div>
        </div>
      ))}
    </>
  );
}
