import { React, useState } from "react";
import "./signin.css";
export default function SignIn(props) {
  const [newUser, setNewUser] = useState({});
  const changeHandler = (event) => {
    const user = { ...newUser };
    user[event.target.name] = event.target.value;
    setNewUser(user);
  };

  const loginHandler = () => {
    props.login(newUser);
  };
  return (
    <div>
      <div
        className={`absolute ${props.visible} z-20 drawer drawer-end dropdown-content h-auto`}
      >
        <input id="my-drawer-45" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side w-auto rounded-2xl">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <ul className="menu w-full md:w-1/2 lg:w-1/4 p-5 text-base-content justify-center">
            <div className="card glass">
              <div className="card-body">
                <h2 className="card-title text-white">Sign In</h2>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  onChange={changeHandler}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="********"
                  className="input input-bordered w-full"
                  onChange={changeHandler}
                />
                <div className="card-actions justify-end">
                  <button type="submit" onClick={loginHandler} className="btn w-full my-1">
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
