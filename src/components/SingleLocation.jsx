import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function SingleLocation() {
  const params = useParams();
  const navigate = useNavigate();
  const [local, setLocal] = useState([]);

  useEffect(() => {
    const SingleLocal = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/location/${params.id}`
      );
      const data = await response.json();
      return data;
    };
    SingleLocal().then((personData) => {
      setLocal(personData);
    });
  }, [params.id]);


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
