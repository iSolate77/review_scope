import React, { useState } from "react";
import logoImg from "../../assets/images/logo.png";
import SignIn from "../auth/signin";
import SignUp from "../auth/signup";
import Axios from "axios";
//import Profile from '../profile/profile';
import {  Link } from "react-router-dom";

export default function Nav(props) {
  let isAuth = props.isAuthenticated;
  /* const [loggedIn, setLoggedIn] = useState(false); */
  const [searchResults, setSearchResults] = useState([]);
  const [bgModifier, setBgModifier] = useState("transparent");
  let setSignUpVisible = props.setSignUpVisible;
  let setSignInVisible = props.setSignInVisible;
  
  let signUpVisible = props.signUpVisible;
  let signInVisible = props.signInVisible;

  const setVisibleSignIn = () => {
    setSignUpVisible(false);
    setSignInVisible(true);
  };
  const setVisibleSignUp = () => {
    setSignInVisible(false);
    setSignUpVisible(true);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchQuery = event.target.value;
    try {
      const response = await Axios.get(`/movie/search?query=${searchQuery}`);
      if (searchQuery === "" || response.length < 1) {
        setSearchResults([]);
        setBgModifier("transparent");
      } else if (response.data.length > 0) {
        setSearchResults(response.data);
        setBgModifier("white");
        console.log(response.data.length);
      } else {
        setSearchResults([]);
        setBgModifier("transparent");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="navbar flex justify-between bg-black">
        <div>
          <div className="dropdown">
            <label className="btn md:hidden btn-circle bg-transparent border-0 swap swap-rotate">
              <input type="checkbox" />
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Categories</Link>
              </li>
              <li>
                <Link to="/profile">Reviews</Link>
              </li>
              <li>
                <label htmlFor="my-drawer-45">Sign In</label>
              </li>
              <li>
                <label htmlFor="my-drawer-4">Sign Up</label>
              </li>
            </ul>
          </div>
          <label className="hidden md:inline-grid btn bg-transparent border-0">
            <Link to="/">Categories</Link>
          </label>
          <label className="hidden md:inline-grid btn bg-transparent border-0">
            <Link to="/">Reviews</Link>
          </label>
        </div>

        <div>
          <img
            src={logoImg}
            className="h-6 mr-3 sm:h-9 logo text-white"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            <Link to="/">Review Scope</Link>
          </span>
        </div>

        <div>
          <div className="dropdown dropdown-end">
            <button className="btn btn-circle bg-transparent border-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <div className="dropdown-content w-96">
              <input
                type="text"
                onChange={handleSearch}
                placeholder="Search"
                className="input input-bordered w-96"
              />
              <div className="absolute z-10 rounded-md shadow-lg mt-2 max-w-full">
                <div
                  className={`carousel rounded-lg bg-${bgModifier} flex flex-col items-center px-4`}
                >
                  {searchResults.map((result) => (
                    <Link to="/details" state={{ film: result}}>
                      <div key={result._id} className="flex gap-2 py-3">
                        <img
                          src={result.poster}
                          className="rounded-lg w-1/3 h-3/6"
                        ></img>
                        <div className="prose p-3 flex flex-col flex-nowrap">
                          <p className="text-sm w-full mt-0 self-start">
                            <strong>{result.title}</strong>
                          </p>
                          <p className="text-xs w-full mt-0 self-start">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {isAuth ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <a onClick={props.logOut}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <label
                htmlFor="my-drawer-45"
                className="ml-1 drawer-button btn bg-transparent border-0 hidden md:inline-grid"
                onClick={() => setVisibleSignIn()}
              >
                Sign In
              </label>
              <label
                htmlFor="my-drawer-4"
                className="drawer-button btn bg-transparent border-0 hidden md:inline-grid"
                onClick={() => setVisibleSignUp()}
              >
                Sign Up
              </label>
            </div>
          )}
        </div>
      </div>
      {isAuth ? (
        <div></div>
      ) : (
        <div>
          <SignIn
            visible={signInVisible ? "" : "hidden"}
            login={props.login}
          ></SignIn>
          <SignUp
            visible={signUpVisible ? "" : "hidden"}
            register={props.register}
          ></SignUp>
        </div>
      )}
    </div>
  );
}
/*<Profile user={props.user} ></Profile>*/
