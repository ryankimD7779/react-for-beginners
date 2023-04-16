import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Detail() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [movie, setMovie] = useState();

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    const getM = json.data.movie;
    console.log("@@@@@@@@@");
    console.log(getM);
    console.log("@@@@@@@@@");
    setMovie(getM);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {movie === undefined ? (
        <h1>WAIT</h1>
      ) : (
        <div>
          <img src={movie.medium_cover_image} alt={movie.name}></img>
          <text>{movie.description_full}</text>
        </div>
      )}

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
}

export default Detail;
