import {  useNavigate } from "react-router-dom";
import { useSingleData } from "../utils/useSingleData";

export function SingleHero() {
  const navigate = useNavigate();

  const {result} = useSingleData("https://rickandmortyapi.com/api/character");

  return (
    <div className="card__wrapper">
      <h1>{result.name}</h1>
      <p>Status: {result.status}</p>
      <p>Species: {result.species}</p>
      <p>Gender: {result.gender}</p>
      <img src={result.image} alt={result.name} />
      {result.type && <p>Type: {result.type}</p>}
      <p>Created: {result.created}</p>
      <div className="button__wrapper">
        <button onClick={() => navigate("/categories/heroes")}>Back</button>
      </div>
    </div>
  );
}
