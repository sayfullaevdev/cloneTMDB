import { Route, Routes } from "react-router";
import Layout from "./components/layout";
import Home from "./components/pages/Home";
import Movie from "./components/pages/Movie";
import Saved from "./components/pages/Saved";
import Profile from "./components/pages/Profile";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/movies/:id" element={<Movie />} />
					<Route path="/saved" element={<Saved />} />
					<Route path="/profile" element={<Profile />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
