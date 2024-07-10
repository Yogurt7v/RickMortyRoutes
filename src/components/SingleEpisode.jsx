import { useNavigate } from "react-router-dom";
import { useSingleData } from "../utils/useSingleData";

export function SingleEpisode() {
  const navigate = useNavigate();

  const {result} = useSingleData("https://rickandmortyapi.com/api/episode");

  return (
    <div className="card__wrapper">
      <h1>{result.name}</h1>
      <p>Air date: {result.air_date}</p>
      <p>Episode: {result.episode}</p>
      <p>Created: {result.created}</p>
      <div className="button__wrapper">
        <button onClick={() => navigate("/categories/episodes")}>Back</button>
      </div>
    </div>
  );
}
