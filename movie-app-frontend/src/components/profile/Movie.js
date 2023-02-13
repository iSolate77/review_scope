import React from "react";

export default function Movie(props) {
  return (
    <div className="mb-5 card w-full bg-base-100 text-black shadow-xl">
      <div className="card-body flex flex-row gap-5 items-center justify-around">
        <img
          className="w-32 rounded-lg"
          src={props.movie.poster}
        ></img>
        <div className="h-full flex flex-col gap-5">
        <h2 className="card-title self-start">{props.movie.title}</h2>
        
        <span className="self-end">{props.movie.description}</span>
        </div>
        <button className="self-start btn border-2 border-red-500 bg-red-500 text-white" onClick={() => props.removeFavoriteMovie(props.movie._id)}>
              <i className="fa-solid fa-heart"></i>
        </button>
      </div>
    </div>
  );
}
