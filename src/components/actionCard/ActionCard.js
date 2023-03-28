import React from "react";
import { Link } from "react-router-dom";

// image="" title="" body=""  link=""
function ActionCard({ image, title, body, link, action }) {
  return (
    <div>
      <div className=" mx-auto  pt-3">
        <div className="card" style={{ width: "18rem" }}>
          <img
            className="card-img-top mx-auto p-2"
            src={image}
            alt="Card image cap"
            style={{ width: "200px", height: "200px" }}
          />

          <div className="card-body text-center">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{body}</p>
            <Link to={link} class="btn btn-primary">
              {action}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActionCard;
