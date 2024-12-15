import React, { useState } from 'react';
//import './StarRating.css'; // Optional for better styling

const StarRating = ({rating = undefined, onRatingChange}) => {
  const handleClick = (index) => {
    onRatingChange(index + 1);
  };

  return (
    <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          style={{
            fontSize: '24px',
            color: rating !== undefined && index < rating ? 'gold' : 'grey',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;