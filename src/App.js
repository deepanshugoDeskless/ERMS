import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CreateQuote from './components/CreateQuote';
import Home from './components/Home';
import NavBar from './components/NavBar';
import {routes } from './routes'
import { useRoutes } from 'react-router';
import Sidebar from './scenes/global/Sidebar';

function App() {
  const element = useRoutes(routes)
  return (
    <div className="App">
    {/* <Login></Login> */}
    {/* <Signup></Signup> */}
    {/* <Profile></Profile> */}
    {/* <CreateQuote></CreateQuote> */}
    {/* <Home></Home> */}
    <NavBar></NavBar>
    {element}
    </div>
  );
}

export default App;
