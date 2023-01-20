import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Map from "./components/Map/Map";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import "leaflet/dist/leaflet.css";

function App() {
    const token = localStorage.getItem("token");
    return (
        <div>
            <Navbar />
            <Router>
                <Routes>
                    <Route
                        path="/map"
                        element={
                            token != null ? (
                                <Map token={token} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/"
                        element={
                            token != null ? (
                                <Map token={token} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            token == null ? <Login /> : <Navigate to="/" />
                        }
                    />
                                        <Route
                        path="/register"
                        element={
                            token == null ? <Register /> : <Navigate to="/" />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
