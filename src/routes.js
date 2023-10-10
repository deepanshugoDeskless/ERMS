import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import CreateQuote from "./components/CreateQuote";
import Home from "./components/Home";
import Team from "./components/team";
import Addemployee from "./components/Addemployee";
import Pagenotfound from "./components/Pagenotfound";
import Welcome from "./components/Welcome";

export const routes = [
  { path: "/home", element: <Home /> },
  { path: "/create", element: <CreateQuote /> },
  { path: "/profile", element: <Profile /> },
  { path: "/team", element: <Team /> },
  { path: "/addemployee", element: <Addemployee /> },
  { path: "/*", element: <Pagenotfound /> },
  { path: "", element: <Welcome /> },
];

export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "", element: <Welcome /> },
];
