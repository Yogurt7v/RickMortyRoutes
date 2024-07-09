import { NavLink, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { sort } from "../utils/sort";

export function Heroes() {
  const [sortParams, setSortParams] = useSearchParams();
  const [heroes, setHeroes] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const observer = useRef();

  const lastNode = useCallback(
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < lastPage) {
          setPage(page + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [page, lastPage]
  );

  useEffect(() => {
    const fetchEpisodesCount = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setLastPage(data.info.pages);
    };
    fetchEpisodesCount();
  }, []);

  useEffect(() => {
    const fetchHeroes = async (page) => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data = await response.json();
      setHeroes((prev) => {
        return [...new Set([...prev, ...data.results])];
      });
    };
    fetchHeroes(page);
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
      {heroes?.map((item, index) => {
        if (heroes.length === index + 1) {
          return (
            <div key={item.id} className="card__wrapper" >
              <div className="items">
                <NavLink state={heroes} to={`/categories/heroes/${item.id}`}>
                  <h2 ref={lastNode}>{item?.name}
                  </h2>
                </NavLink>
              </div>
            </div>
          );
        } else {
          return (
            <div key={item.id} className="card__wrapper">
              <div className="items">
                <NavLink state={heroes} to={`/categories/heroes/${item.id}`}>
                  <h2>{item?.name}</h2>
                </NavLink>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}

