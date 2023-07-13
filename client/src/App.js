import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import Properties from "./components/Properties";
import Cookies from "js-cookie";
import AboutUs from "./components/AboutUs";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log("aaaaaaaaaaaa", Cookies.get);
  }, [isAuthenticated]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Home {...{ setIsAuthenticated, isAuthenticated, setUser }} />
            }
            path="/home"
            default
          />
          <Route element={<AboutUs />} path="/aboutus" />
          <Route element={<Home />} path="/" default />
          <Route
            element={<Register {...{ setIsAuthenticated, isAuthenticated }} />}
            path="/register"
          />
          <Route
            element={
              <Login {...{ setIsAuthenticated, isAuthenticated, setUser }} />
            }
            path="/login"
          />
          <Route
            element={
              <Properties
                {...{ setIsAuthenticated, isAuthenticated, user, setUser }}
              />
            }
            path="/properties"
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
