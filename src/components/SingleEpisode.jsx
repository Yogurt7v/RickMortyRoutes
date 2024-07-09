import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export function SingleEpisode() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [episode, setEpisode] = useState([]);

  useEffect(() => {
    setEpisode(location.state.filter((item)=> item.id == params.id)[0])
  }, [params.id, location.state]);

  return (
    <div className="card__wrapper">
      <h1>{episode.name}</h1>
      <p>Air date: {episode.air_date}</p>
      <p>Episode: {episode.episode}</p>
      <p>Created: {episode.created}</p>
      <div className="button__wrapper">
        <button onClick={() => navigate("/categories/episodes")}>Back</button>
      </div>
    </div>
  );
}
