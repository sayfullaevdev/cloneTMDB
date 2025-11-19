import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "@/lib/axios";
import MovieCard from "../custom/MovieCard";
import { Badge } from "@/components/ui/badge";
import { useTrailer } from "@/context/GlobalTrailerContext";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

interface Poster {
  file_path: string;
}

const Movie: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [related, setRelated] = useState<MovieDetails[]>([]);
  const [posters, setPosters] = useState<Poster[]>([]);
  const [videoKey, setVideoKey] = useState<string | null>(null);

  // глобальный трейлер
  const { setTrailer, setMini } = useTrailer();

  const getTrailerKey = (videos: any[]) => {
    const t = videos.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );
    return t ? t.key : null;
  };

  const getPosters = (data: any): Poster[] => data.posters || [];

  useEffect(() => {
    if (!id) return;

    // при заходе в фильм — развернуть трейлер в большой режим
    setMini(false);

    (async () => {
      try {
        const movieReq = axiosInstance.get(`/movie/${id}?language=ru`);
        const relatedReq = axiosInstance.get(
          `/movie/${id}/similar?language=ru`
        );
        const imagesReq = axiosInstance.get(`/movie/${id}/images`);
        const videosReq = axiosInstance.get(
          `/movie/${id}/videos?adult=false`
        );

        const [m, r, img, vid] = await Promise.all([
          movieReq,
          relatedReq,
          imagesReq,
          videosReq,
        ]);

        setMovie(m.data);
        setRelated(r.data.results || []);
        setPosters(getPosters(img.data));

        const trailerKey = getTrailerKey(vid.data.results || []);
        setVideoKey(trailerKey);      // локальный большой трейлер
        setTrailer(trailerKey);       // глобальный трейлер
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  if (!movie) {
    return (
      <div className="text-center py-10 text-neutral-400">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-6">
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
            {movie.genres.map((g) => (
              <Badge
                key={g.id}
                variant="secondary"
                className="bg-yellow-400/20 text-yellow-400 text-xs"
              >
                {g.name}
              </Badge>
            ))}
          </div>

          <p className="text-neutral-300 max-w-2xl leading-relaxed">
            {movie.overview || "Описание отсутствует"}
          </p>

          <div className="flex items-center gap-4 overflow-x-scroll mt-4 pb-2">
            {posters.map((p) => (
              <img
                key={p.file_path}
                src={`${import.meta.env.VITE_TMDB_IMAGES}${p.file_path}`}
                className="w-[200px] h-[200px] object-cover rounded shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Большой трейлер */}
      {videoKey && (
        <iframe
          className="w-full h-[500px] rounded-md mb-10"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      )}

      <h2 className="text-xl font-semibold mb-4">Похожие фильмы</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {related.map((rel) => (
          <MovieCard key={rel.id} movie={rel} />
        ))}
      </div>
    </div>
  );
};

export default Movie;
