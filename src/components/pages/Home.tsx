import axiosInstance from "@/lib/axios";
import React, { useEffect, useState } from "react";

import Pagination from "../custom/Pagination";
import MovieCard from "../custom/MovieCard";

interface Movie {
	id: number;
	title: string;
	poster_path: string;
	vote_average: number;
	release_date: string;
}

const Home: React.FC = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		axiosInstance
			.get(`/discover/movie?page=${page}&language=ru`)
			.then((res) => {
				setMovies(res.data.results);
				setTotalPages(res.data.total_pages);
			})
			.catch((err) => console.error(err));
	}, [page]);

	return (
		<div className="px-4 md:px-8 py-6">
			<h1 className="text-2xl font-semibold mb-6">
				Популярные фильмы 🎬
			</h1>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
				{movies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>

			<Pagination page={page} totalPages={totalPages} setPage={setPage} />
		</div>
	);
};

export default Home;
