import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { sort } from "../utils/sort";
import { useFetch } from "../utils/useFetch";

export function Locations() {
  const [, setSortParams] = useSearchParams();
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);

  const { loading, fetchResult, hasMore, error } = useFetch(
    "https://rickandmortyapi.com/api/location",
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
    setLocations(fetchResult);
  }, [fetchResult]);

  function handleSort(key) {
    setSortParams({ key: key });
    const sortedLocations = sort(locations, key);
    setLocations(sortedLocations);
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
      <div className="container">
        {locations.map((item, index) => {
          if (locations.length === index + 1) {
            return (
              <div key={item.id} className="card__wrapper">
                <div className="items">
                  <NavLink
                    state={locations}
                    to={`/categories/locations/${item.id}`}
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
                    state={locations}
                    to={`/categories/locations/${item.id}`}
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
