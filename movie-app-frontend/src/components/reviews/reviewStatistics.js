import {React, useEffect} from "react";

export default function ReviewStatistics() {
  useEffect(() => {
    getReviewsPercentage();
  }, [])
  const getReviewsPercentage = () =>{
  }

  return (
    <div className="bg-white card p-10">
        <button className="btn btn-primary" onClick={() => getReviewsPercentage()}>Get statistics</button>
      <h2 className="text-black m-0">Global Ratings</h2>
      <div className="flex gap-3 items-center">
        <p className="w-1/12">5 Star</p>
        <progress
          className="progress progress-warning"
          value="100"
          max="100"
        ></progress>
      </div>
      <div className="flex gap-3 items-center">
        <p className="w-1/12">4 Star</p>
        <progress
          className="progress progress-warning"
          value="80"
          max="100"
        ></progress>
      </div>
      <div className="flex gap-3 items-center">
        <p className="w-1/12">3 Star</p>
        <progress
          className="progress progress-warning"
          value="60"
          max="100"
        ></progress>
      </div> <div className="flex gap-3 items-center">
        <p className="w-1/12">2 Star</p>
        <progress
          className="progress progress-warning"
          value="40"
          max="100"
        ></progress>
      </div> <div className="flex gap-3 items-center">
        <p className="w-1/12">1 Star</p>
        <progress
          className="progress progress-warning"
          value="20"
          max="100"
        ></progress>
      </div>
    </div>
  );
}
