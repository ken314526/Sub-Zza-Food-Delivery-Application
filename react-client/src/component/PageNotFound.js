import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="container text-center py-5">
      <div className="row">
        <div className="col">
          <h1 className="display-4">404 - Page Not Found</h1>
          <p className="lead">The page you are looking for does not exist.</p>
          <Link to="/" className="btn">
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
