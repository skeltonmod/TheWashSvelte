import { Navigate, Routes, Route, Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Anime from "./Pages/Anime";
import Series from "./Pages/Series";
import Movie from "./Pages/Movie";

export default function Router() {
  const PublicRoute = () => {
    return <Outlet />;
  };
  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/anime/:id",
      element: <Anime />,
    },
    {
      path: "/tv/:id",
      element: <Series />,
    },
    {
      path: "/movie/:id",
      element: <Movie />,
    },
    {
      path: "*",
      element: <Home />,
    },
  ]);

  return (
    <RouterProvider router={appRoute} />
  );
}
