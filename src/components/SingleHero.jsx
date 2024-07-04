import { useNavigate, useParams } from "react-router-dom";
import heroes from "../data-base/characters.json";

export function SingleHero() {
  const params = useParams();
  const navigate = useNavigate();

  // eslint-disable-next-line eqeqeq
  const person = heroes.filter((hero) => hero.id == params.id);

  return (
    <div className="card__wrapper">
      <h1>{person[0].name}</h1>
      <p>Status: {person[0].status}</p>
      <p>Species: {person[0].species}</p>
      <p>Gender: {person[0].gender}</p>
      <img src={person[0].image} alt={person[0].name} />
      {person[0].type && <p>Type: {person[0].type}</p>}
      <p>Created: {person[0].created}</p>

      <div className="button__wrapper">
        <button onClick={() => navigate("/categories/heroes")}>Back</button>
      </div>
    </div>
  );
}
