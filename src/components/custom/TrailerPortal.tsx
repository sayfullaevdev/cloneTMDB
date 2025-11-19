import { useEffect } from "react";
import ReactDOM from "react-dom";

const trailerRoot = document.getElementById("trailer-root")!;

const TrailerPortal = ({ children }: { children: React.ReactNode }) => {
	const el = document.createElement("div");

	useEffect(() => {
		trailerRoot.appendChild(el);
		return () => {
		};
	}, []);

	return ReactDOM.createPortal(children, el);
};

export default TrailerPortal;
