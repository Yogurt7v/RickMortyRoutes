import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { sort } from "../utils/sort";
import { fetchData } from "../utils/fetchData";

export function Episodes() {
  const [sortParams, setSortParams] = useSearchParams();
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const observer = useRef();

  const lastNode = useCallback((node) => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  }, []);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await fetchData(
        `https://rickandmortyapi.com/api/episode?page=${page}`,
        page
      );
      setEpisodes([...episodes, ...response]);
    };
    fetchEpisodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function handleSort(key) {
    setSortParams({ key: key });
    const sortedEpisodes = sort(episodes, key);
    setEpisodes(sortedEpisodes);
  }

  useEffect(() => {
    const sortedHeroes = sort(episodes, sortParams.get("key"));
    setEpisodes(sortedHeroes);
  }, [sortParams, episodes]);

  return (
    <>
      {episodes ? (
        <div className="button__wrapper">
          <button onClick={() => handleSort("ASC")}>по возрастанию</button>
          <button onClick={() => handleSort("DESC")}>по убыванию</button>
        </div>
      ) : (
        <p>Ничего не найдено</p>
      )}
      {episodes.map((item, index) => (
        <div key={item?.id} className="card__wrapper">
          <div className="items">
            <NavLink to={`/categories/episodes/${item.id}`}>
              <h2
                ref={(el) => {
                  if (index === episodes.length - 1) lastNode(el);
                }}
              >
                {item?.name}
              </h2>
            </NavLink>
          </div>
        </div>
      ))}
    </>
  );
}
