import React, { useEffect } from "react";
import { useParams } from "react-router";
import MovieCard from "../custom/MovieCard";
import { Badge } from "@/components/ui/badge";
import { useTrailer } from "@/context/GlobalTrailerContext";

import {
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
  useGetMovieImagesQuery,
  useGetMovieVideosQuery
} from "@/api/apiSlice";

const Movie: React.FC = () => {
  const { id } = useParams();
  const { data: movie, isLoading } = useGetMovieDetailsQuery(id!);
  const { data: relatedData } = useGetSimilarMoviesQuery(id!);
  const { data: imagesData } = useGetMovieImagesQuery(id!);
  const { data: videosData } = useGetMovieVideosQuery(id!);
  const { setTrailer, setMini } = useTrailer();

  useEffect(() => { setMini(false); }, []);
  const trailer = videosData?.results?.find((v: any) => v.type === "Trailer" && v.site === "YouTube");
  useEffect(() => { if (trailer?.key) setTrailer(trailer.key); }, [trailer]);

  return (
    <div className="px-4 md:px-8 py-6">
      {isLoading || !movie ? (<span>Загрузка...</span>) : (
        <>
          <div className="flex flex-col md:flex-row gap-6 mb-10">
            <img
              src={`${import.meta.env.VITE_TMDB_IMAGES}${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md w-full md:w-64"
            />
            <div>
              <h1 className="text-3xl font-semibold mb-2">{movie.title}</h1>
              <div className="flex items-center gap-3 mb-4 text-sm text-neutral-400">
                <span>{movie.release_date}</span>
                <span>•</span>
                <span>★ {movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((g: any) => (
                  <Badge key={g.id} className="bg-yellow-400/20 text-yellow-400 text-xs">
                    {g.name}
                  </Badge>
                ))}
              </div>
              <p className="text-neutral-300 max-w-2xl leading-relaxed">
                {movie.overview || "Описание отсутствует"}
              </p>
              <div className="flex items-center gap-4 overflow-x-scroll mt-4 pb-2">
                {imagesData?.posters?.map((p: any) => (
                  <img
                    key={p.file_path}
                    src={`${import.meta.env.VITE_TMDB_IMAGES}${p.file_path}`}
                    className="w-[200px] h-[200px] object-cover rounded shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>

          {trailer?.key && (
            <iframe
              className="w-full h-[500px] rounded-md mb-10"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0`}
            />
          )}

          <h2 className="text-xl font-semibold mb-4">Похожие фильмы</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {(relatedData?.results || []).map((rel: any) => (
              <MovieCard key={rel.id} movie={rel} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
