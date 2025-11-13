import axiosInstance from "@/lib/axios";
import { useSaved } from "@/providers/SavedProvider";
import React, { useEffect, useState } from "react";
import MovieCard from "../custom/MovieCard";

const Saved: React.FC = () => {
	const { saved } = useSaved();
	const [movies, setMovies] = useState<any>(null);

	const asyncGetMovie = async (id: number) => {
		const res = await axiosInstance.get(`/movie/${id}?language=ru`);

		return res.data;
	};

	useEffect(() => {
		Promise.all(saved.map((id: number) => asyncGetMovie(id))).then(
			(movies) => setMovies(movies)
		);
	}, []);

	return (
		<div className="px-4 md:px-8 py-6">
			<h1 className="text-2xl font-semibold mb-6">
				Сохраненные фильмы 🎬
			</h1>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
				{movies
					? movies.map((movie: any) => (
							<MovieCard key={movie.id} movie={movie} />
					  ))
					: "loading..."}
			</div>
		</div>
	);
};

export default Saved;
