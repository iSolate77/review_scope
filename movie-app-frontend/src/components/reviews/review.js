import {React ,useState} from "react";
import EditReview from "./EditReview";

export default function Review(props) {

  let ratingScore = props.review.rating;
  let from = props.from;
  let isEdit = false;

  return (
    <div className="mb-5 card w-full bg-base-100 text-black shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{props.review.title}</h2>
          <div className="text-orange-400">
            {props.calculateStars(ratingScore)}
          </div>
        </div>
        <p>{props.review.comment}</p>
        {from === "profile" ? (
          <div className="self-end">        
            <label htmlFor="my-modal-34" className="btn btn-sm bg-black mx-1" onClick={() => {props.getReviewData(props.review._id); isEdit = true}}>
              Edit Review
            </label>
            <input type="checkbox" id="my-modal-34" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="my-modal-34"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold mb-0">
                  Edit Review
                </h3>
                <p className="py-4">
                <EditReview review={props.currentReview} updateReview={props.updateReview}></EditReview>
                </p>
              </div>
            </div>
            <button className="btn bg-black btn-sm" onClick={() => props.deleteReview(props.review._id)}>Delete Review</button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
