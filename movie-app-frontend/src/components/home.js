import { React, useState, useEffect } from "react";
import Player from "./player";
import Movies from "./home/carouselMovies";
import Axios from "axios";

export default function Home(props) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovies();
  }, []);
  const getMovies = () => {
    Axios.get("/movie/index")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container-fluid text-center md:text-start mx-auto">
      <Player isAuthenticated={props.isAuthenticated} user={props.user}></Player>
      <Movies films={movies}></Movies>
    </div>
  );
}
