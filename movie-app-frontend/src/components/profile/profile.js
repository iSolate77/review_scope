import { React, useEffect, useState } from "react";
import Reviews from "../reviews";
import Movie from "./Movie";
import EditProfile from "./editprofile";
import FavoriteMovies from "./favoritemovies";
import Star from "../reviews/star";
import Review from "../reviews/review";

import "./profile.css";
import profileBackground from "../../assets/images/black-bg2.png";
import Axios from "axios";

export default function Profile(props) {
  const [userData, setUserData] = useState({});
  const [tab, setTab] = useState(0);
  const [currentReview, setCurrentReview] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const [userFavorites, setFavorites] = useState([]);

  useEffect(() => {
    getProfileData();
    getUserData();
    getFavorites();
  }, []);

  const setActiveTab = (number) => {
    setTab(number);
  };

  const getUserData = () => {
    Axios.get(`/user/reviews?id=${props.user.user.id}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
    })
      .then((response) => {
        setUserReviews(response.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  };

  const getProfileData = () => {
    Axios.get(`/user/info?id=${props.user.user.id}`,{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
    })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  };

  const getFavorites = () =>{
    Axios.get(`/movie/favorite?id=${props.user.user.id}`,{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
    })
    .then(response => {
      setFavorites(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const updateUserData = (user) => {
    Axios.put("/user/info/update", user, {headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
  }})
    .then((response) => {
      getProfileData();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const calculateStars = (rating) => {
    let result = [];
    for (let i = 0; i < rating; i++) {
      result.push(<Star></Star>);
    }
    return result;
  };

  const getReviewData = (id) => {
    Axios.get(`review/edit?id=${id}`,  {headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
  }})
      .then((response) => {
        setCurrentReview(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateReview= (review) => {
    Axios.put("/review/update", review, {headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
  }})
      .then((response) => {
        getUserData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteReview = (id) => {
    Axios.delete(`/review/delete?id=${id}`, {headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
  }})
      .then((response) => {
        getUserData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFavoriteMovie = (movieId) => {
    Axios.delete("user/favorites/delete", {headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    } , data: { userId: props.user.user.id , movieId: movieId }})
    .then(res => {
      console.log(res);
      getFavorites();
    })
    .catch(error => {
      console.log(error);
    })
  }

  let reviews = userReviews.map((review, index) => (
    <div key={index} className="carousel-item">
      <Review
        review={review}
        getReviewData={getReviewData}
        calculateStars={calculateStars}
        updateReview={updateReview}
        deleteReview={deleteReview}
        currentReview={currentReview}
        from="profile"
      ></Review>
    </div>
  ));
  
  let favorites = userFavorites.map((movie, index) => (
    <Movie key={index} movie={movie} removeFavoriteMovie={removeFavoriteMovie}></Movie>
  ));

  let tabs = [
    <Reviews
      from="profile"
      className="text-black"
      allReviews={reviews}
      sortedReviews={0}
    ></Reviews>,
    <FavoriteMovies favorites={favorites}></FavoriteMovies>,
  ];

  return (
    <div className="container gap-2 my-11 mx-auto">
      <div className="bg-white w-full flex justify-center items-center rounded-xl">
        <div className="w-full">
          <img
            className="w-full h-80 rounded-t-lg"
            src={profileBackground}
            alt="Background"
          />
          <div className="-mt-14 avatar px-4">
            <div className="w-24 rounded-full ring ring-gray-800 ring-offset ring-offset-2">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
          <div className="flex mt-5 justify-between px-5">
            <div className="prose">
              <h3 className="text-black font-bold">{userData.firstName} {userData.lastName}</h3>
            </div>

            <label htmlFor="my-modal-3" className="btn btn-sm bg-black">
              <i className="mx-2 fa-solid fa-pen-to-square"></i>
              Edit Profile
            </label>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-sm btn-circle bg-black absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold">Edit Profile</h3>
                  <EditProfile currentUser={userData} updateUserData={updateUserData}></EditProfile>
              </div>
            </div>
          </div>
          <div className="flex p-5">
            <div className="tabs w-full">
              <a
                className={`tab tab-bordered w-1/2 ${
                  tab == 0 ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab(0)}
              >
                My Reviews
              </a>
              <a
                className={`tab tab-bordered w-1/2 ${
                  tab == 1 ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab(1)}
              >
                My Favorite Movies
              </a>
            </div>
          </div>
          <div className="px-5">{tabs[tab]}</div>
        </div>
      </div>
    </div>
  );
}
