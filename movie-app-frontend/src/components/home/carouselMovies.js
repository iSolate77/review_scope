import React from "react";
import { Router, Route, Link } from "react-router-dom";

export default function carouselMovies(props) {
  const films = props.films.map((film, index) => (
    <div key={index} className="carousel-item">
        <Link className="carousel-item" to="/details" state={{ film: film}}>
          <img
            src={film.poster}
          ></img>
        </Link>
    </div>
  ));

  return (
    <div className="bg-black">
      <div className="container mx-auto ">
        <div className="prose mt-10 pt-5 p-3">
          <h1 className="text-white">Featured Movies</h1>
        </div>
        <div className="carousel flex carousel-center p-4 space-x-4 ">
          {films}
        </div>
      </div>
    </div>
  );
}
