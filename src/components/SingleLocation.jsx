import { useNavigate, useParams } from "react-router-dom";
import locations from "../data-base/location.json";

export function SingleLocation() {
  const params = useParams();
  const navigate = useNavigate();

  // eslint-disable-next-line eqeqeq
  const local = locations.filter((item) => item.id == params.id);

  return (
    <div className="card__wrapper">
      <h1>{local[0].name}</h1>
      <p>Type: {local[0].type}</p>
      <p>Dimension: {local[0].dimension}</p>
      <p>Created: {local[0].created}</p>

      <div className="button__wrapper">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}
