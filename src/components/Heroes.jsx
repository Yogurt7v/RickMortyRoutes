import { NavLink, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { sort } from "../utils/sort";
import { fetchData } from "../utils/fetchData";

export function Heroes() {
  const [sortParams, setSortParams] = useSearchParams();
  const [heroes, setHeroes] = useState([]);
  const [page, setPage] = useState(1);
  const observer = useRef();

  const lastNode = useCallback((node) => {
    if (observer.current) {observer.current.disconnect()}
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        setPage ( (prev => prev + 1) );
      }
      })
      if (node){
        observer.current.observe(node);
      }
    }, []);


  useEffect(() => {
    const fetchHeroes = async () => {
      const response = await fetchData(
        `https://rickandmortyapi.com/api/character?page=${page}`,
        page
      );
      setHeroes([...heroes, ...response]);
    };
    fetchHeroes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <h2 ref={(el) =>{
                if (index === heroes.length - 1) lastNode(el);
              }}>{item.name}</h2>
            </NavLink>
          </div>
        </div>
      ))}
    </>
  );
}
