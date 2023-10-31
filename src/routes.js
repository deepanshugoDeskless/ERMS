import Login from "./components/Login";
import Signup from "./components/Signup";
import Team from "./components/team";
import Pagenotfound from "./components/Pagenotfound";
import Welcome from "./components/Welcome";

export const routes = [
  { path: "/team", element: <Team /> },
  { path: "/*", element: <Pagenotfound /> },
  { path: "", element: <Welcome /> },
];
export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "", element: <Welcome /> },
  { path: "/*", element: <Pagenotfound /> },
];
