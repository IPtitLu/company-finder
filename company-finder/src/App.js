import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from './components/Map/Map';
import CompanyList from './components/CompanyList/CompanyList';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <div>
      <Navbar/>
      <Router>
      <Routes>
      <Route path="/map" element={<Map />} />
      <Route path="/liste" element={<CompanyList/>} />
      <Route path="/home" element={<Home/>} />
      </Routes>
      </Router>
    </div>
  );
  
}


export default App;