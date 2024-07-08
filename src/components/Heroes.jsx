import { NavLink, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { sort } from "../utils/sort";

export function Heroes() {
  const [sortParams, setSortParams] = useSearchParams();
  const [heroes, setHeroes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchHeroes = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      return data;
    };

    fetchHeroes().then((heroesData) => {
      setHeroes([...heroes, ...heroesData.results]);
    });
  }, [page]);

  function handleSort(key) {
    setSortParams({ key: key });
    const sortedHeroes = sort(heroes, key);
    setHeroes(sortedHeroes);
  }
  
  useEffect(() => {
    const sortedHeroes = sort(heroes, sortParams.get("key"));
    setHeroes(sortedHeroes);
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
      {heroes?.map((item) => (
        <div key={item.id} className="card__wrapper">
          <div className="items">
            <NavLink to={`/categories/heroes/${item.id}`}>
              <h2>{item.name}</h2>
            </NavLink>
          </div>
        </div>
      ))}
      <button onClick={()=> setPage((prev) => prev + 1)}>Показать еще</button>
    </>
  );
}
