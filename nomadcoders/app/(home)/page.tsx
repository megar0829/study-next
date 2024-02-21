import Link from "next/link";
import styles from "../../styles/home.module.css";
import Movie from "../../components/movie";

export const metadata = {
  title: "Home",
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const movies = await getMovies();

  return (
    <div className={styles.container}>
      {movies.map((movie, index) => {
        return (
          <Movie 
            key={index} 
            id={movie.id}
            poster_path={movie.poster_path} 
            title={movie.title} 
          />
        );
      })}
    </div>
  );
}