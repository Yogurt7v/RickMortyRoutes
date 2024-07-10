import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { sort } from "../utils/sort";
import { useFetch } from "../utils/useFetch";

export function Episodes() {
  const [, setSortParams] = useSearchParams();
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);

  const { loading, fetchResult, hasMore } = useFetch(
    "https://rickandmortyapi.com/api/episode",
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
    setEpisodes(fetchResult);
  }, [fetchResult]);

  function handleSort(key) {
    setSortParams({ key: key });
    const sortedEpisodes = sort(episodes, key);
    setEpisodes(sortedEpisodes);
  }

  return (
    <>
      <div className="button__wrapper">
        <button onClick={() => handleSort("ASC")}>по возрастанию</button>
        <button onClick={() => handleSort("DESC")}>по убыванию</button>
      </div>
      <div className="container">
        {episodes.map((item, index) => {
          if (episodes.length === index + 1) {
            return (
              <div key={item.id} className="card__wrapper">
                <div className="items">
                  <NavLink
                    state={episodes}
                    to={`/categories/episodes/${item.id}`}
                  >
                    <h2 ref={lastNode}>{item?.name}</h2>
                  </NavLink>
                </div>
              </div>
            );
          } else {
            return (
              <div key={item.id} className="card__wrapper">
                <div className="items">
                  <NavLink
                    state={episodes}
                    to={`/categories/episodes/${item.id}`}
                  >
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
