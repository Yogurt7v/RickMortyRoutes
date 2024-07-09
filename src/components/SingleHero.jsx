import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function SingleHero() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [person, setPerson] = useState([]);
  

  useEffect(() => {
    setPerson(location.state.filter((item)=> item.id == params.id)[0])
  }, [params.id, location.state]);

  return (
    <div className="card__wrapper">
      <h1>{person.name}</h1>
      <p>Status: {person.status}</p>
      <p>Species: {person.species}</p>
      <p>Gender: {person.gender}</p>
      <img src={person.image} alt={person.name} />
      {person.type && <p>Type: {person.type}</p>}
      <p>Created: {person.created}</p>
      <div className="button__wrapper">
        <button onClick={() => navigate("/categories/heroes")}>Back</button>
      </div>
    </div>
  );
}
