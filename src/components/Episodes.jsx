import episodes from "../data-base/episode.json";
import { NavLink } from "react-router-dom";
import { useSort } from "../utils/useSort";

export function Episodes() {

  const { newArray, asc, desc } = useSort(episodes);

  return (
    <>
      <div className="button__wrapper">
        <button
          onClick={() => {
            asc();
          }}
        >
          ASC
        </button>
        <button
          onClick={() => {
            desc();
          }}
        >
          DESC
        </button>
      </div>
      {newArray.map((item) => (
        <div key={item.id} className="card__wrapper">
          <div className="items">
            <NavLink to={`/categories/episodes/${item.id}`}>
              <h2>{item.name}</h2>
            </NavLink>
          </div>
        </div>
      ))}
    </>
  );
}
