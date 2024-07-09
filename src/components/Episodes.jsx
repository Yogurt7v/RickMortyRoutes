import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { sort } from "../utils/sort";

export function Episodes() {
  const [sortParams, setSortParams] = useSearchParams();
  const [episodes, setEpisodes] = useState([]);
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
          setPage((prev) => prev + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [lastPage, page]
  );

  useEffect(() => {
    const fetchEpisodesCount = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/episode");
      const data = await response.json();
      setLastPage(data.info.pages);
    };
    fetchEpisodesCount();
  }, []);

  useEffect(() => {
    const fetchEpisode = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${page}`
      );
      const data = await response.json();
      setEpisodes((prev) => {
        return [...new Set([...prev, ...data.results])];
      });
    };
    fetchEpisode();
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
      {episodes.map((item, index) => {
        if (episodes.length === index + 1) {
          return (
            <div key={item.id} className="card__wrapper">
              <div className="items">
                <NavLink state={episodes} to={`/categories/episodes/${item.id}`}>
                  <h2 ref={lastNode}>{item?.name}</h2>
                </NavLink>
              </div>
            </div>
          );
        } else {
          return (
            <div key={item.id} className="card__wrapper">
              <div className="items">
                <NavLink state={episodes} to={`/categories/episodes/${item.id}`}>
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
