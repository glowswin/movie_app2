import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie);
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <main class="container">
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          <div>
            <span>
              년도:<span>{movie.year}</span> 평점:
              <span>{movie.rating}</span> 언어:
              <span>{movie.language}</span> 다운로드수:
              <span>{movie.download_count}</span>
            </span>
          </div>
          <img src={movie.large_cover_image} alt={movie.title} />
          <p>{movie.description_full}</p>
        </div>
      )}
    </main>
  );
}

export default Detail;
