import React from "react";
import video from "../assets/videos/trailer.mp4";
import "./player.css";

export default function player(props) {
  return (
    <div className="videoPlayer hidden md:block">
      <div className="video-overlay"></div>
      <div className="heroContent prose text-white">
        <h1 className="text-white mb-0">Review Your Favorite Movies</h1>
        <h3 className="mt-5 text-white">
          Reivewing your movies and looking for reviews to watch your next movie
          has never been easier with the Movie App!
        </h3>
        <div className="flex justify-center">
          <button className="btn btn-primary w-1/3">{props.isAuthenticated ? `Welcome ${props.user.user.firstName}` : "Join Now"}</button>
        </div>
      </div>
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
