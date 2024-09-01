import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import MoviesList from "./components/MoviesList/MoviesList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} path="/">
      <Route index element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="moviesList" element={<MoviesList />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
