import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

interface IParams {
  params: {id: string};
}

export async function generateMetadata({params: {id}} : IParams) {
  const movie = await getMovie(id);

  return {
    title: movie.title,
  };
}

export default async function MovieDetailPage({params: {id}} : IParams) {

  // 병렬 fetch : 두개 이상의 비동기를 동기로 처리하는 방법 (Promise.all 사용)
  // 두 개의 함수가 동시에 시작하도록 처리는 했지만 두 함수가 모두 끝날때까지 기다려야 한다.

  // const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)])
  
  // 여러 개의 data를 fetch 하면서 각각의 데이터를 별개로 처리하면서 먼저 데이터를 받아오는 component는
  // 먼저 Client에게 보여주기 위해서는 Suspense Tag를 이용한다.
  // 각각의 Data get Function을 Component로 분리하고
  // 각각의 Component를 Suspense Tag로 감싼 후 fallback attribute로 Loading Message를 표현

  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>

      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}