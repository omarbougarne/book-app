import React from "react";

const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {/* Display review details like rating and comment */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
