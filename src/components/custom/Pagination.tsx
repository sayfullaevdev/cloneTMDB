import React from "react";
import { Button } from "@/components/ui/button";

interface Pagination {
	page: number;
	totalPages: number;
	setPage: (page: number) => void;
}

const Pagination: React.FC<Pagination> = ({ page, totalPages, setPage }) => {
	return (
		<div className="flex justify-center items-center space-x-2 mt-8">
			<Button
				variant="outline"
				size="sm"
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
			>
				Prev
			</Button>
			<span className="text-sm text-neutral-400">
				Page {page} of {totalPages}
			</span>
			<Button
				variant="outline"
				size="sm"
				disabled={page === totalPages}
				onClick={() => setPage(page + 1)}
			>
				Next
			</Button>
		</div>
	);
};

export default Pagination;
