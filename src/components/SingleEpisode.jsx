import { useNavigate, useParams } from "react-router-dom";
import episodes from "../data-base/episode.json";

export function SingleEpisode() {
  const params = useParams();
  const navigate = useNavigate();

  // eslint-disable-next-line eqeqeq
  const scene = episodes.filter((item) => item.id == params.id);

  return (
    <div className="card__wrapper">
      <h1>{scene[0].name}</h1>
      <p>Air date: {scene[0].air_date}</p>
      <p>Episode: {scene[0].episode}</p>
      <p>Created: {scene[0].created}</p>
      <div className="button__wrapper">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}
