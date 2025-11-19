import { RouterProvider, createBrowserRouter } from "react-router";
import { TrailerProvider } from "@/context/GlobalTrailerContext";

import Layout from "./components/layout";
import Home from "./components/pages/Home";
import Movie from "./components/pages/Movie";
import Saved from "./components/pages/Saved";
import Profile from "./components/pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "movies/:id", element: <Movie /> },
      { path: "saved", element: <Saved /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

function App() {
  return (
    <TrailerProvider>
      <RouterProvider router={router} />
    </TrailerProvider>
  );
}

export default App;
