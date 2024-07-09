import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { sort } from "../utils/sort";

export function Locations() {
  const [sortParams, setSortParams] = useSearchParams();
  const [locations, setLocations] = useState([]);
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
    [page, lastPage]
  );

  useEffect(() => {
    const fetchLocations = async (page) => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/location?page=${page}`
      );
      const data = await response.json();
      setLocations((prev) => {
        return [...new Set([...prev, ...data.results])];
      });
    };
    fetchLocations();
  }, [page]);

  useEffect(() => {
    const fetchEpisodesCount = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/location");
      const data = await response.json();
      setLastPage(data.info.pages);
    };
    fetchEpisodesCount();
  }, []);

  function handleSort(key) {
    setSortParams({ key: key });
    const sortedLocations = sort(locations, key);
    setLocations(sortedLocations);
  }

  useEffect(() => {
    const sortedLocations = sort(locations, sortParams.get("key"));
    setLocations(sortedLocations);
  }, [sortParams, locations]);

  return (
    <>
      {locations ? (
        <div className="button__wrapper">
          <button onClick={() => handleSort("ASC")}>по возрастанию</button>
          <button onClick={() => handleSort("DESC")}>по убыванию</button>
        </div>
      ) : (
        <p>Ничего не найдено</p>
      )}
      {locations.map((item, index) => {
        if (locations.length === index + 1) {
          return (
            <div key={item.id} className="card__wrapper">
              <div className="items">
                <NavLink state={locations} to={`/categories/locations/${item.id}`}>
                  <h2 ref={lastNode}>{item?.name}</h2>
                </NavLink>
              </div>
            </div>
          );
        } else {
          return (
            <div key={item.id} className="card__wrapper">
              <div className="items">
                <NavLink state={locations} to={`/categories/locations/${item.id}`}>
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
