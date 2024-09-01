import styles from "./ShowMoreInfo.module.css";

const captialize = (item) => {
  return item[0].toUpperCase() + item.slice(1);
};

function ShowMoreInfo({ showMore, setShowMore, movies }) {
  const selectedMovie = movies[showMore.languageIndex].filter(
    (movie) => movie._id === showMore.movieId
  );
  return (
    <div className={styles.movieInfoContainer}>
      <div
        className={styles.infoBackground}
        onClick={() => setShowMore({ ...showMore, showMore: false })}
      ></div>
      <div className={styles.movieInfoWrapper}>
        <div className={styles.closeButton}>
          <button onClick={() => setShowMore({ ...showMore, showMore: false })}>
            X
          </button>
        </div>
        <div className={styles.movieInfo}>
          {selectedMovie.map(
            ({
              title,
              genre,
              director,
              stars,
              language,
              releasedDate,
              pageViews,
              totalVoted,
              poster,
              description,
            }) => (
              <div>
                {console.log(stars)}
                <div className={styles.movieDetailsWrapper}>
                  <img src={poster} alt="" />
                  <div>
                    <h1>{title}</h1>
                    <div className={styles.releasedDate}>
                      {new Date(releasedDate * 1000).getFullYear()}
                    </div>
                    <div className={styles.genre}>
                      {genre.split(",").map((a) => (
                        <span>{captialize(a)}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  Lorem eiusmod non excepteur deserunt id ad sunt Lorem tempor
                  adipisicing exercitation. Duis enim eiusmod ex cupidatat elit
                  enim magna sunt culpa occaecat ut ex. Incididunt veniam veniam
                  voluptate id et nostrud labore commodo aliqua. Irure mollit in
                  quis velit non culpa irure.
                </div>
                <div className={styles.movieCast}>
                  <div>
                    <strong>Director:</strong> {director}
                  </div>
                  <div>
                    <strong>Stars:</strong> {stars[0].replaceAll(",", ", ")}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowMoreInfo;
