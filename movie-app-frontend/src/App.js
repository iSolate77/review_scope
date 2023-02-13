import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import Navbar from "./components/header/Nav";
import Home from "./components/home";
import Profile from "./components/profile/profile";
import EditProfile from "./components/profile/editprofile";
import Footer from "./components/footer/Footer";
import Details from "./components/details";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import Loader from "./components/loader/loader";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [signInVisible, setSignInVisible] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token != null) {
      let user = jwt_decode(token);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else if (!user) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    }
  }, []);

  // Auth Code
  const registerHandler = (user) => {
    Axios.post("auth/signup", user)
      .then((/* response */) => {
        /* console.log(response); */
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginHandler = (cred) => {
    Axios.post("auth/login", cred)
      .then((response) => {
        let token = response.data.token;
        if (token != null) {
          localStorage.setItem("token", token);
          let user = jwt_decode(token);
          setIsAuthenticated(true);
          setUser(user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser({});
    Navigate("/");
  };

  return (
    <div className="bg-black">
      <Router>
        <Loader></Loader>
        <Navbar
          register={registerHandler}
          login={loginHandler}
          isAuthenticated={isAuthenticated}
          logOut={onLogoutHandler}
          signInVisible={signInVisible}
          signUpVisible={signUpVisible}
          setSignInVisible={setSignInVisible}
          setSignUpVisible={setSignUpVisible}
          user={user}
        ></Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <Home isAuthenticated={isAuthenticated} user={user}
              ></Home>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                register={registerHandler}
                login={loginHandler}
                user={user}
              ></Profile>
            }
          ></Route>
          <Route
            path="/profile/edit"
            element={<EditProfile></EditProfile>}
          ></Route>
          <Route
            path="/details"
            element={
              <Details
                userId={user}
                isAuthenticated={isAuthenticated}
              ></Details>
            }
          ></Route>
        </Routes>
      </Router>

      <Footer></Footer>
    </div>
  );
}

export default App;
