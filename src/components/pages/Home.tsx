import React, { useState } from "react";
import Pagination from "../custom/Pagination";
import MovieCard from "../custom/MovieCard";
import { useGetMoviesQuery } from "@/api/apiSlice";

const Home: React.FC = () => {
	const [page, setPage] = useState(1);
	const { data, isLoading, isError } = useGetMoviesQuery(page);
	if (isLoading) return <span>Loading...</span>;
	if (isError) return <span>Лээ брат, ты invalid </span>;

	return (
		<div className="px-4 md:px-8 py-6">
			<h1 className="text-2xl font-semibold mb-6">
				Популярные фильмы 🎬
			</h1>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
				{data.results.map((movie: any) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>

			<Pagination
				page={page}
				totalPages={data.total_pages}
				setPage={setPage}
			/>
		</div>
	);
};

export default Home;
