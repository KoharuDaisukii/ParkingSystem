import RootLayout from "../pages/Root";
import MainRoute from "../pages/MainRoute";
import Login from "../pages/Login";
import CarDetail, { loader as carDetailLoader } from "../pages/CarDetail";
import { createBrowserRouter } from "react-router-dom";
import CarImage from "../pages/CarImage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainRoute />,
      },
      { path: "login", element: <Login /> },
      { path: "car/:car_no", element: <CarDetail />, loader: carDetailLoader },
      {
        path: "car/:id/image",
        element: <CarImage />,
      },
    ],
  },
]);
