import logo from './logo.svg';
import './App.css';
import 'flowbite';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Food from './pages/Food';
import Home from './pages/Home';
import FoodDetail from './pages/FoodDetail';
import SignupUser from './pages/SignupUser';

function App() {
  return (
    <>
      <Navbar/>

      <Routes>
        <Route path = "/create-food" element = {<Food/>}/>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/food-detail/:id" element = {<FoodDetail/>}/>
        <Route path= "/signup-User" element={<SignupUser/>} />
      </Routes>
    </>
  );
}

export default App;
