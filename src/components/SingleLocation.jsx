import { useNavigate } from "react-router-dom";
import { useSingleData } from "../utils/useSingleData";

export function SingleLocation() {
  const navigate = useNavigate();

  const { result } = useSingleData("https://rickandmortyapi.com/api/location");

  return (
    <div className="card__wrapper">
      <h1>{result.name}</h1>
      <p>Type: {result.type}</p>
      <p>Dimension: {result.dimension}</p>
      <p>Created: {result.created}</p>

      <div className="button__wrapper">
        <button onClick={() => navigate("/categories/locations")}>Back</button>
      </div>
    </div>
  );
}
