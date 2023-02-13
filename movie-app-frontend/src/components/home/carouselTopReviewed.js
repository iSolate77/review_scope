import React from "react";

export default function carouselMovies(props) {
  const films = props.films.map((film, index) => (
    <div key={index} className="carousel-item">
      <a href="#" className="carousel-item">
        <img src={`${film.poster}`}></img>
      </a>
    </div>
  ));
  return (
    <div className="bg-black">
      <div className="container mx-auto ">
        <div className="prose pt-5 p-3">
          <h1 className="text-white">Top Reviewed</h1>
        </div>
        <div className="carousel flex carousel-center p-4 space-x-4 ">
          {films}
        </div>
      </div>
    </div>
  );
}
