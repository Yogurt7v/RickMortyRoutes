import { NavLink } from "react-router-dom";
import heroes from "../data-base/characters.json";

export function Heroes() {
  return (
    <>
      {heroes.map((item) => (
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
