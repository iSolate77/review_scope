import React, { useState } from "react";
import "./signin.css";
export default function SignUp(props) {
  const [newUser, setNewUser] = useState({});

  const changeHandler = (event) => {
    const user = { ...newUser };
    user[event.target.name] = event.target.value;
    setNewUser(user);
  };

  const registerHandler = () => {
    props.register(newUser);
  };

  return (
    <div>
      <div className={`${props.visible} absolute z-20 drawer drawer-end dropdown-content h-auto`}>
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side w-auto rounded-2xl">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <ul className="menu w-full md:w-1/2 lg:w-1/4 p-5 text-base-content items-start justify-start">
            <div className="card glass">
              <div className="card-body">
                <h2 className="card-title text-white">Sign Up</h2>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      className="input input-bordered w-full"
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      className="input input-bordered w-full"
                      onChange={changeHandler}
                    />
                  </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    name="username"
                    type="text"
                    placeholder="New Username"
                    className="input input-bordered w-full"
                    onChange={changeHandler}
                  />
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    onChange={changeHandler}
                  />
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    onChange={changeHandler}
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-full my-1"
                  onClick={registerHandler}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
