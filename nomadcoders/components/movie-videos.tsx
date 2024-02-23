import { API_URL } from "../app/constants";
import styles from "../styles/movie-videos.module.css";

async function getVideos(id:string) {
  // console.log(`Fetching videos: ${Date.now()}`);
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // throw new Error("something broke...");

  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

export default async function MovieVideos({ id }: { id:string }) {
  const videos = await getVideos(id);

  return (
    <div className={styles.container}>
      {videos.map((video, index) => (
        <iframe
          key={index}
          src={`https://youtube.com/embed/${video.key}`}
          title={video.name}
          allowFullScreen
        />
      ))}
    </div>
  );
}