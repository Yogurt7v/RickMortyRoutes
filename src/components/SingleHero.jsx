import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function SingleHero() {
  const params = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState([]);

  useEffect(() => {
    const SingleHero = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${params.id}`
      );
      const data = await response.json();
      return data;
    };
    SingleHero().then((personData) => {
      setPerson(personData);
    });
  }, [params.id]);

  return (
    <div className="card__wrapper">
      <h1>{person.name}</h1>
      <p>Status: {person.status}</p>
      <p>Species: {person.species}</p>
      <p>Gender: {person.gender}</p>
      <img src={person.image} alt={person.name} />
      {person.type && <p>Type: {person.type}</p>}
      <p>Created: {person.created}</p>

      {/* <div className="button__wrapper">
        <button onClick={() => navigate("/categories/heroes")}>Back</button>
      </div> */}
    </div>
  );
}
