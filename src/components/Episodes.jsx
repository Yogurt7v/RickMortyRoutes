import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { sort } from "../utils/sort";

export function Episodes()  {
  const [sortParams, setSortParams] = useSearchParams();
  const [newArray, setNewArray] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/episode");
      const data = await response.json();
      return data;
    };

    fetchEpisodes().then((episodesData) => {
      setEpisodes(episodesData.results);
      setNewArray(episodesData.results);
    });
  }, []);

  function handleSort(key) {
    setSortParams({ key: key });
    const sortedHeroes = sort(episodes, key);
    setNewArray(sortedHeroes);
  }

  useEffect(() => {
    const sortedHeroes = sort(episodes, sortParams.get("key"));
    setNewArray(sortedHeroes);
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
      {newArray.map((item) => (
        <div key={item?.id} className="card__wrapper">
          <div className="items">
            <NavLink to={`/categories/episodes/${item.id}`}>
              <h2>{item?.name}</h2>
            </NavLink>
          </div>
        </div>
      ))}
    </>
  );
}
