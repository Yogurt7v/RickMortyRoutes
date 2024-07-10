import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function SingleLocation() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [local, setLocal] = useState([]);

  useEffect(() => {
    if (!location.state) {
      fetch(`https://rickandmortyapi.com/api/location/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
          setLocal(data);
        });
    } else {
      setLocal(
        location.state.filter((item) => item.id === parseInt(params.id))[0]
      );
    }
  }, [params.id, location.state]);

  return (
    <div className="card__wrapper">
      <h1>{local.name}</h1>
      <p>Type: {local.type}</p>
      <p>Dimension: {local.dimension}</p>
      <p>Created: {local.created}</p>

      <div className="button__wrapper">
        <button onClick={() => navigate("/categories/locations")}>Back</button>
      </div>
    </div>
  );
}
