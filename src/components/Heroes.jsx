import { NavLink, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { sort } from "../utils/sort";

export function Heroes() {
  const [sortParams, setSortParams] = useSearchParams();
  const [heroes, setHeroes] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const observer = useRef();

  const lastNode = useCallback((node) => {
    if (observer.current) {observer.current.disconnect()}
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && (page < lastPage)) {
        setPage ( (prev => prev + 1) );
      }
      })
      if (node){
        observer.current.observe(node);
      }
    }, [page, lastPage]);

    useEffect(() => {
      const fetchEpisodesCount = async () => {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const data = await response.json();
        setLastPage(data.info.pages);
      };
      fetchEpisodesCount();
    }, []);


    useEffect(() => {
      const fetchHeroes = async () => {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        const data = await response.json();
        setHeroes([...heroes, ...data.results])
      };
      fetchHeroes();
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
      {heroes?.map((item, index) => (
        <div key={item.id} className="card__wrapper">
          <div className="items" >
            <NavLink to={`/categories/heroes/${item.id}`}>
            <h2>
                {heroes.length === index + 1 ? (
                  <div ref={lastNode}>{item?.name}</div>
                ) : (
                  <>{item?.name}</>
                )}
              </h2>
            </NavLink>
          </div>
        </div>
      ))}
    </>
  );
}
