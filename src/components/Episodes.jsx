import episodes from "../data-base/episode.json"
import { NavLink } from "react-router-dom";

export function Episodes() {

    return (
        <>
          {episodes.map((item) => (
            <div key={item.id} className="card__wrapper">


            <div  className="items">
              <NavLink to={`/categories/episodes/${item.id}`}>
                <h2>{item.name}</h2>
              </NavLink>
            </div>
            </div>
          ))}
        </>
      );
}