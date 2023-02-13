import React, { useState } from "react";
import Movie from "./Movie";
export default function FavoriteMovies(props) {
  return (
    <div>
      <div className="mt-6 carousel carousel-center carousel-vertical rounded-box">
        {props.favorites}
      </div>
    </div>
  );
}
