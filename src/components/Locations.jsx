import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { sort } from "../utils/sort";
import { fetchData } from "../utils/fetchData";

export function Locations() {
  const [sortParams, setSortParams] = useSearchParams();
  const [locations, setLocations] = useState([]);
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
      const fetchLocations = async () => {
        const response = await fetchData(
          `https://rickandmortyapi.com/api/location?page=${page}`,
          page
        );
        setLocations([...locations, ...response]);
      };
      fetchLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

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
      {locations.map((item, index) => (
        <div key={item.id} className="card__wrapper">
          <div className="items">
            <NavLink to={`/categories/locations/${item.id}`}>
              <h2 ref={(el) =>{
                if (index === locations.length - 1) lastNode(el);
              }}>{item.name}</h2>
            </NavLink>
          </div>
        </div>
      ))}
    </>
  );
}
