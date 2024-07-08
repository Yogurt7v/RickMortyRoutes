import { NavLink, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Header } from "./Header";

const AuthStatus = lazy(() =>
  import("./AuthStatus").then((module) => ({ default: module.AuthStatus }))
);

export function NavMenu() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <AuthStatus />
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
      </Suspense>
    </>
  );
}
