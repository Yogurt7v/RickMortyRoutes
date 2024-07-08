import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { sort } from "../utils/sort";

export function Locations() {
  const [sortParams, setSortParams] = useSearchParams();
  const [newArray, setNewArray] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/location");
      const data = await response.json();
      return data;
    };

    fetchLocations().then((locationsData) => {
      setLocations(locationsData.results);
      setNewArray(locationsData.results);
    });
  }, []);

  function handleSort(key) {
    setSortParams({ key: key });
    const sortedHeroes = sort(locations, key);
    setNewArray(sortedHeroes);
  }

  useEffect(() => {
    const sortedLocations = sort(locations, sortParams.get("key"));
    setNewArray(sortedLocations);
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
      {newArray.map((item) => (
        <div key={item.id} className="card__wrapper">
          <div className="items">
            <NavLink to={`/categories/locations/${item.id}`}>
              <h2>{item.name}</h2>
            </NavLink>
          </div>
        </div>
      ))}
    </>
  );
}
