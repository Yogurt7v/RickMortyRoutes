import { NavLink, Outlet } from "react-router-dom";
import { Header } from "./Header";

export function NavMenu() {
  return (
    <>
      <Header />

      <div className="Navmenu__container">
        <nav>
          <NavLink to="/categories">Categories</NavLink>
          <ul>
            <li>
              <NavLink to="/categories/heroes">Heroes</NavLink>
            </li>
            <li>
              <NavLink to="/categories/locations">Locations</NavLink>
            </li>
            <li>
              <NavLink to="/categories/episodes">Episodes</NavLink>
            </li>
          </ul>
        </nav>
      </div>
        <Outlet />
    </>
  );
}
