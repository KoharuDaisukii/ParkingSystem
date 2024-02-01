import Header from "./components/Header";
import Input from "./components/Input";
import ParkList from "./components/ParkList";
import MainRoute from "./routes/MainRoute";
import Login from "./components/Login";
import {
  createBrowserRouter,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainRoute />,
      },
      { path: "login", element: <Login /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
