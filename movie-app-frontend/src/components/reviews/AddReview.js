import { React, useState } from "react";

export default function AddReview(props) {
  const [newReview, setNewReview] = useState({
    movieId: props.movieId,
    userId: props.userId
  });
  const changeHandler = (event) => {
    const review = { ...newReview };
    review['rating'] = 5;
    review[event.target.name] = event.target.value;
    setNewReview(review);
  };

  const addHandler = () => {
    props.addReview(newReview);
  };
  return (
    <div className="border-1 border-solid border-white mt-5">
      <div className="form-control mb-3">
        <div className="text-start">
          <div className="form-control mb-3 mt-3">
            <div className="label prose">
              <h2 className="text-white">Your Rating</h2>
            </div>
          </div>
          <div className="rating">
            <input
              type="radio"
              name="rating"
              value="1"
              className="mask mask-star-2 bg-orange-400"
              onChange={changeHandler}
            />
            <input
              type="radio"
              name="rating"
              value="2"
              onChange={changeHandler}
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating"
              value="3"

              onChange={changeHandler}
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating"
              value="4"

              onChange={changeHandler}
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating"
              value="5"

              onChange={changeHandler}
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
          <label className="label prose">
            <h2 className="text-white">Review Title</h2>
          </label>
          <input
            name="title"
            type="text"
            placeholder="Type here"
            className="text-black input input-bordered w-full"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="form-control w-full">
        <label className="label prose">
          <h2 className="text-white">Your Review</h2>
        </label>
        <textarea
          name="comment"
          className="text-black textarea"
          placeholder="Type here"
          onChange={changeHandler}
        ></textarea>
      </div>
      <button className="btn btn-primary my-5 w-full" onClick={addHandler}>
        Submit Review
      </button>
    </div>
  );
}
