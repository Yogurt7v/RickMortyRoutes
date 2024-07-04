import location from "../data-base/location.json";
import { NavLink } from "react-router-dom";

export function Locations() {
  return (
    <>
      {location.map((item) => (
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
