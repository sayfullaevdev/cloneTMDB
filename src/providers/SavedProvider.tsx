import React, { createContext, useContext, useEffect, useState } from "react";

const savedCTX = createContext<any>(null);

interface Props {
	children: React.ReactNode;
}

const SavedProvider: React.FC<Props> = ({ children }) => {
	const [saved, setSaved] = useState<number[]>(
		JSON.parse(localStorage.getItem("saved") || "[]")
	);

	function handleSave(id: number) {
		if (!id) throw new Error("Id was not provided");

		const hasId = saved.find((savedID) => savedID === id);

		if (hasId) {
			// delete id
			setSaved((prev) => prev.filter((savedID) => savedID !== id));
		} else {
			// save id
			setSaved((prev) => [...prev, id]);
		}
	}

	function isSaved(id: number) {
		if (!id) throw new Error("Id was not provided");

		return saved.find((savedID) => savedID === id); // true || false
	}

	useEffect(() => {
		localStorage.setItem("saved", JSON.stringify(saved));
	}, [saved]);

	return (
		<savedCTX.Provider value={{ handleSave, saved, isSaved }}>
			{/* app */}
			{children}
		</savedCTX.Provider>
	);
};

export function useSaved() {
	const context = useContext(savedCTX);

	if (!context) {
		throw new Error("useSaved must be used within a SavedProvider");
	}

	return context;
}

export default SavedProvider;
