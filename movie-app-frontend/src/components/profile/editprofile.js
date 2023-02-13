import React, { useEffect, useState } from "react";
import bycrypt from "bcryptjs-react";

export default function EditProfile(props) {
  const [userData, setUserData] = useState(props.currentUser);

  useEffect(() => {
      if (props.currentUser) {
        setUserData(props.currentUser);
      }
  }, [props.currentUser]);

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const updateUser = { ...userData };
    updateUser[attributeToChange] = newValue;

    if (updateUser["password"] !== "") {
      if (updateUser["password"] !== props.currentUser.password) {
        updateUser["password"] = bycrypt.hashSync("soapsoap", 10);
      }
    } else {
      updateUser["password"] = props.currentUser.password;
    }

    setUserData(updateUser);
  };
  const handleSubmit = () => {
    props.updateUserData(userData);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="mb-4">
        <div className="relative z-0 w-full mb-6 group">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={userData.firstName}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="relative z-0 w-full mb-6 group">
          <input
            name="lastName"
            type="text"
            value={userData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="relative z-0 w-full mb-6 group">
          <input
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="relative z-0 w-full mb-6 group">
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <input
          type="file"
          className="file-input file-input-ghost w-full max-w-xs"
        />
      </div>
      <button className="btn bg-black" type="submit" onClick={handleSubmit}>
        Update
      </button>
    </div>
  );
}
