import React from "react";

export default function movieDescription(props) {
  return (
    <div>
      <div className="collapse-title px-0">
        <div className="prose">
          <h2 className="text-white">Description</h2>
        </div>
      </div>
      <div>
        <p className="text-white">{props.description}</p>
      </div>
    </div>
  );
}
