import { NavLink } from "react-router-dom";
import heroes from "../data-base/characters.json";
import { useSort } from "../utils/useSort";

export function Heroes() {
  const { newArray, asc, desc } = useSort(heroes);

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
            <NavLink to={`/categories/heroes/${item.id}`}>
              <h2>{item.name}</h2>
            </NavLink>
          </div>
        </div>
      ))}
    </>
  );
}
