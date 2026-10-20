import React from "react";
import img from "../Images/1.jpg";

const Products = () => {
  return (
    <div className="home-container">
      <div className="home-text">
        <h1>GitHub Profile</h1>
        <p>
          View GitHub user profiles fetched dynamically using{" "}
          <strong>React Router v7 loaders</strong>. This demonstrates preloading
          data, smooth navigation, and professional UI design.
        </p>
        <p>
          Explore user information like username, bio, followers, and more in a
          clean layout.
        </p>
      </div>
      <div className="home-image">
        <img src={img} alt="GitHub illustration" />
      </div>
    </div>
  );
};

export default Products;
