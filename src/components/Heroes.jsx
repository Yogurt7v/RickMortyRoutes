import { NavLink, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { sort } from "../utils/sort";
// import ErrorBoundary from "./ErrorBoundary";

export function Heroes() {
  const [sortParams, setSortParams] = useSearchParams();
  const [newArray, setNewArray] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const page = useRef(1);

  useEffect(() => {
    const fetchHeroes = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page.current}`
      );
      const data = await response.json();
      return data;
    };

    fetchHeroes().then((heroesData) => {
      // setHeroes(heroesData.results);
      setNewArray([...heroes, ...heroesData.results]);
    });
  }, [heroes, newArray]);

  function handleSort(key) {
    setSortParams({ key: key });
    const sortedHeroes = sort(heroes, key);
    setNewArray(sortedHeroes);
  }

  useEffect(() => {
    const sortedHeroes = sort(heroes, sortParams.get("key"));
    setNewArray(sortedHeroes);
  }, [sortParams, heroes]);

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
            <NavLink to={`/categories/heroes/${item.id}`}>
              <h2>{item.name}</h2>
            </NavLink>
          </div>
        </div>
      ))}
      <button onClick={() => (page.current += 1)}>Показать еще</button>
    </>
  );
}
