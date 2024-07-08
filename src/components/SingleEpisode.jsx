import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function SingleEpisode() {
  const params = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState([]);


  useEffect(() => {
    const SingleEpisode = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${params.id}`
      );
      const data = await response.json();
      return data;
    };
    SingleEpisode().then((episodeData) => {
      setEpisode(episodeData);
    });
  }, [params.id]);


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
