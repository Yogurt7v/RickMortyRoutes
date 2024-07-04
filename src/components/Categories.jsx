import { NavLink } from "react-router-dom";

export function Categories() {
  return (
    <div>
      <h1>Categories Page</h1>
      <ol>
        <li>
          <NavLink to="/categories/heroes">Heroes</NavLink>
        </li>
        <li>
          <NavLink to="/categories/locations">Locations</NavLink>
        </li>
        <li>
          <NavLink to="/categories/episodes">Episodes</NavLink>
        </li>
      </ol>
    </div>
  );
}
