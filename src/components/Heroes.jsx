import { NavLink, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { sort } from "../utils/sort";
import { useFetch } from "../utils/useFetch";

export function Heroes() {
  const [, setSortParams] = useSearchParams();
  const [heroes, setHeroes] = useState([]);
  const [page, setPage] = useState(1);

  const { loading, fetchResult, hasMore, error } = useFetch(
    "https://rickandmortyapi.com/api/character",
    page
  );

  const observer = useRef();
  const lastNode = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setHeroes(fetchResult);
  }, [fetchResult]);

  function handleSort(key) {
    setSortParams({ key: key });
    const sortedHeroes = sort(heroes, key);
    setHeroes(sortedHeroes);
  }

  if (error){
    return (
      <div className="card__wrapper">
        <h2>{error.message}</h2>
      </div>
    )
  }

  return (
    <>
      <div className="button__wrapper">
        <button onClick={() => handleSort("ASC")}>по возрастанию</button>
        <button onClick={() => handleSort("DESC")}>по убыванию</button>
      </div>
      <div className="container" hasError>
        {heroes?.map((item, index) => {
          if (heroes.length - 3 === index + 1) {
            return (
              <div key={item.id} className="card__wrapper">
                <div className="items">
                  <NavLink state={heroes} to={`/categories/heroes/${item.id}`}>
                    <h2 ref={lastNode}>{item?.name}</h2>
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
      </div>
    </>
  );
}
