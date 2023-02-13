import { React, useState, useEffect } from "react";

export default function EditReview(props) {
  const [review, setReview] = useState(props.review);
  
  useEffect(() => {
    if (props.review) {
      setReview(props.review);
    }
  }, [props.review]);

  const changeHandler = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const updatedReview = {...review};
    updatedReview[attributeToChange] = newValue;
    setReview(updatedReview);
  };
  
  const editHandler = () => {
    props.updateReview(review);
  };

  return (
    <div className="border-1 border-solid border-white">
      <div className="form-control mb-3">
        <div className="text-start">
          <div className="form-control mb-3">
            <div className="label prose">
              <h3 className="text-black">Your Rating</h3>
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
            <h3 className="text-black">Review Title</h3>
          </label>
          <input
            name="title"
            type="text"
            value={review.title}
            placeholder="Type here"
            className="text-black input input-bordered w-full"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="form-control w-full">
        <label className="label prose">
          <h3 className="text-black">Your Review</h3>
        </label>
        <textarea
          name="comment"
          value={review.comment}
          className="text-black textarea border-1 border-gray-300"
          placeholder="Type here"
          onChange={changeHandler}
        ></textarea>
      </div>
      <button className="btn bg-black my-5 w-full" onClick={editHandler}>
        Edit Review
      </button>
    </div>
  );
}
