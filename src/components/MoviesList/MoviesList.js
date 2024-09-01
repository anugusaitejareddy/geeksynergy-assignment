import React from "react";
import useLogInContext from "../../hooks/useLogInContext";
import { useNavigate } from "react-router-dom";
import styles from "./MoviesList.module.css";
import ShowMoreInfo from "../ShowMoreInfo/ShowMoreInfo";

const captialize = (item) => {
  return item[0].toUpperCase() + item.slice(1);
};

function MoviesList() {
  // context
  const { userStatus } = useLogInContext();

  //routing
  const navigate = useNavigate();

  //state
  const [fetchStatus, setFetchStatus] = React.useState("loading");
  const [moviesList, setMoviesList] = React.useState([]);
  const [showMoreInformation, setShowMoreInformation] = React.useState({
    showMore: false,
  });

  const languages = ["hindi", "kannada", "telugu"];
  React.useEffect(() => {
    if (!userStatus.isLoggedIn) {
      navigate("/");
    } else {
      fetchMoviesList();
    }

    async function fetchMoviesList() {
      setFetchStatus("loading");
      let fetchedAPIs = 0;
      let fetchResults = [];
      for (const language of languages) {
        try {
          const res = await fetch("https://hoblist.com/api/movieList", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              category: "movies",
              language: language,
              genre: "all",
              sort: "voting",
            }),
          });

          const data = await res.json();

          fetchResults.push(data.result);
          fetchedAPIs++;
        } catch (err) {
          setFetchStatus("error");
          console.log(err);
        }
      }
      if (fetchedAPIs === languages.length) {
        setFetchStatus("success");
        setMoviesList(fetchResults);
        console.log(fetchResults);
        console.log("moviesList", moviesList);
      }
    }
    //eslint-disable-next-line
  }, []);

  if (fetchStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (fetchStatus === "error") {
    return <div>Couldn't fetch movies list</div>;
  }

  return (
    <div className={styles.moviesListContainer}>
      {moviesList.map((movies, languageIndex) => (
        <div className={styles.moviesListWrapper}>
          <h1>{captialize(languages[languageIndex])} Movies List</h1>
          <div className={`${styles.moviesList} `}>
            {movies.map(({ _id, title, pageViews, poster }) => (
              <div key={_id} className={styles.movie}>
                <div className={styles.movieImageContainer}>
                  <img src={poster} alt="" />
                </div>
                <div className={styles.movieDetailsContainer}>
                  <div className={styles.pageViews}>{pageViews} views</div>
                  <div className={styles.movieTitle}>{title}</div>
                  <button
                    onClick={() =>
                      setShowMoreInformation({
                        ...showMoreInformation,
                        showMore: true,
                        movieId: _id,
                        languageIndex,
                      })
                    }
                  >
                    More Information
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {showMoreInformation.showMore && (
        <ShowMoreInfo
          setShowMore={setShowMoreInformation}
          showMore={showMoreInformation}
          movies={moviesList}
        />
      )}
    </div>
  );
}

export default MoviesList;
