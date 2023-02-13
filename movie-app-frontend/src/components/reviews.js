import React, { useState, useEffect} from "react";
import AddReview from "./reviews/AddReview";

export default function Reviews(props) {
  const [isAdd, setIsAdd] = useState(false);

  let allReviews = props.allReviews;

  useEffect(() => {
  }, [])
  
  const orderByHighest = () => {
    props.orderByHighest()
  }

  const orderByLowest = () => {
    props.orderByLowest()
  }

  return (
    <div>
      <div className="collapse-title flex p-4 px-0 items-center justify-between">
        <div className="prose">
          <h2 className={props.className}>Reviews</h2>
        </div>

        {props.from == "profile" ? <div></div> : <div className="hidden md:block">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="dropdown dropdown-bottom dropdown-end">
              <label tabIndex={0} className="btn-sm btn">
                Order By
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content text-black menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={() => orderByHighest()}>Latest</a>
                </li>
                <li>
                  <a onClick={() => orderByLowest()}>Oldest</a>
                </li>
              </ul>
            </div>
            {props.isAuthenticated ? <button className="btn-sm btn" onClick={() => setIsAdd(!isAdd)}>
              +
            </button>
            : <div></div>}
          </div>
        </div>}
      </div>
     {props.from == "profile" ? <div></div> : <div className="md:hidden">
        <div className="flex flex-row justify-center gap-2">
          <div className="dropdown dropdown-bottom dropdown-start w-1/2">
            <label tabIndex={0} className="btn-sm btn w-full">
              Order By
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content text-black menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Latest</a>
              </li>
              <li>
                <a>Oldest</a>
              </li>
            </ul>
          </div>
          {props.isAuthenticated ? <button className="btn-sm btn w-1/2" onClick={() => setIsAdd(!isAdd)}>
            +
          </button> : <div></div>}
        </div>
      </div>}
      <div className="mt-6 carousel carousel-center carousel-vertical rounded-box">
        {props.sortedReviews.length > 0 ? props.sortedReviews : allReviews}
      </div>
      {isAdd ? <AddReview addReview={props.addReview} movieId={props.movieId} userId={props.userId.id}></AddReview> : null}
    </div>
  );
}
