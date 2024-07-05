import episodes from "../data-base/episode.json";
import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { sort } from "../utils/sort";

export function Episodes() {
  const [sortParams, setSortParams] = useSearchParams();
  const [newArray, setNewArray] = useState([]);


  function handleSort(key) {
    setSortParams({ key: key });
    const sortedHeroes = sort(episodes, key);
    setNewArray(sortedHeroes);
  }

  useEffect(() => {
    const sortedHeroes = sort(episodes, sortParams.get("key"));
    setNewArray(sortedHeroes);
  }, [sortParams]);

  return (
    <>
      <div className="button__wrapper">
        <button onClick={() => handleSort("ASC")}>по возрастанию</button>
        <button onClick={() => handleSort("DESC")}>по убыванию</button>
      </div>
      {newArray.map((item) => (
        <div key={item.id} className="card__wrapper">
          <div className="items">
            <NavLink to={`/categories/episodes/${item.id}`}>
              <h2>{item.name}</h2>
            </NavLink>
          </div>
        </div>
      ))}
    </>
  );
}
