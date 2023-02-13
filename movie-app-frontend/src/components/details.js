import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieDescription from "./details/MovieDescription";
import Reviews from "./reviews";
import Star from "./reviews/star";
import Review from "./reviews/review";
import Axios from "axios";

export default function Details(props) {
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const location = useLocation();
  const { film } = location.state;

  useEffect(() => {
    getReviews();
    setAllReviews(allDefaultReviews);
    if (props.user) {
      getFavorites();
    }
  }, [film._id, reviews]);

  //Favorites code

  const getFavorites = () => {
    Axios.get(`user/favorites?id=${props.userId.user.id}`)
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const addToFavorites = async () => {
    console.log(film._id)
    console.log(props.userId.user.id)
    try {
      if (!favorites.includes(film._id)) {
        setFavorites([...favorites, film._id]);
        await Axios.post("user/favorites/add", { userId: props.userId.user.id, movieId: film._id }, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });

      } else {
        setFavorites(favorites.filter((item) => item !== film._id));
        Axios.delete("user/favorites/delete", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }, data: { userId: props.userId.user.id, movieId: film._id }
        })
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Reviews Code
  const getReviews = () => {
    Axios.get(`/movie/detail?id=${film._id}`)
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function getYear(year) {
    const newDate = new Date(year);
    return newDate.getFullYear();
  }

  const addReview = (review) => {
    Axios.post("/review/add", review, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        getReviews();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateStars = (rating) => {
    let result = [];
    for (let i = 0; i < rating; i++) {
      result.push(<Star key={i}></Star>);
    }
    return result;
  };

  let allDefaultReviews = reviews.map((review, index) => (
    <div key={index} className="carousel-item">
      <Review
        from="details"
        key={index}
        review={review}
        calculateStars={calculateStars}
      ></Review>
    </div>
  ));

  const orderByHighest = () => {
    let highestReviews = reviews.reverse().map((review, index) => (
      <div key={index} className="carousel-item">
        <Review review={review} key={index} calculateStars={calculateStars}></Review>
      </div>
    ));
    setSortedReviews(highestReviews);
  };

  const orderByLowest = () => {
    let orderByLowest = reviews.map((review, index) => (
      <div key={index} className="carousel-item">
        <Review
          review={review}
          key={index}
          calculateStars={calculateStars}
        ></Review>
      </div>
    )).sort();
    setSortedReviews(orderByLowest);
  };

  return (
    <div className="bg-black text-white">
      <div className="container flex flex-col mx-auto">
        <div>
          <div className="prose flex max-w-full justify-between p-5">
            <h1 className="text-white">
              {film.title} ({getYear(film.releaseDate)})
            </h1>
            {props.userId.user !== undefined ?
              <div>
                {favorites.includes(film._id) ? <button className="btn border-2 border-red-500 bg-red-500 text-white" onClick={addToFavorites}>
                  <i className="fa-solid fa-heart"></i>
                </button> : <button className="btn border-2 border-white bg-transparent text-white" onClick={addToFavorites}>
                  <i className="fa-solid fa-heart"></i>
                </button>}
              </div> : <div></div>}

          </div>
          <div className="flex max-x-full flex-row">
            <img className="w-96 p-1" src={film.poster}></img>
            <div className="w-screen p-0.5">
              <iframe
                className="w-full h-full"
                src={film.trailer_url}
                title="YouTube video player"
                border="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-5">
        {/* <span className="badge badge-outline p-4 mr-2">Action</span>
        <span className="badge badge-outline p-4 mr-2">Comedy</span>
        <span className="badge badge-outline p-4 mr-2">Adventure</span> */}
        <div className="flex flex-col md:flex-row mt-5 justify-between">
          <div className="px-2 prose md:w-1/2 max-w-none">
            <MovieDescription description={film.description}></MovieDescription>
          </div>
          <div className="md:w-1/2 px-2">
            <Reviews
              isAuthenticated={props.isAuthenticated}
              allReviews={allReviews}
              sortedReviews={sortedReviews}
              className="text-white"
              from="details"
              addReview={addReview}
              orderByHighest={orderByHighest}
              orderByLowest={orderByLowest}
              movieId={film._id}
              userId={props.userId.user}
            ></Reviews>
          </div>
        </div>
      </div>
    </div>
  );
}
