import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { BookMarked } from "lucide-react";
import { Button } from "../ui/button";
import { useSaved } from "@/providers/SavedProvider";

interface Movie {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  };
}

const MovieCard: React.FC<Movie> = ({ movie }) => {
  const { handleSave, isSaved } = useSaved();

  return (
    <Card
      className="
        border rounded-md p-2 transition-all duration-200
        bg-white text-black border-gray-300 hover:border-yellow-500
        dark:bg-[#111] dark:text-white dark:border-gray-800 dark:hover:border-yellow-400
      "
    >
      <CardContent className="p-2">
        <Link to={`/movies/${movie.id}`}>
          <img
            src={`${import.meta.env.VITE_TMDB_IMAGES}${movie.poster_path}`}
            alt={movie.title}
            className="rounded-md mb-2"
          />
        </Link>

        <h3 className="text-sm font-medium line-clamp-1">
          {movie.title}
        </h3>

        <div className="flex items-start justify-between w-full mt-1">
          <div className="flex flex-col gap-2">
            <Badge className="text-xs bg-yellow-400/40 text-yellow-800 dark:bg-yellow-400/20 dark:text-yellow-400">
              ★ {movie.vote_average.toFixed(1)}
            </Badge>
            <span className="text-xs text-neutral-700 dark:text-neutral-500">
              {movie.release_date.split("-")[0]}
            </span>
          </div>

          <Button
            onClick={() => handleSave(movie.id)}
            className={`
              cursor-pointer
              ${isSaved(movie.id)
                ? "bg-red-500 text-black dark:bg-red-700 dark:text-white"
                : "bg-amber-300 text-black dark:bg-amber-400 dark:text-black"}
            `}
          >
            <BookMarked />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
