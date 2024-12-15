import Layout from "../components/layout"
import MovieCard from "../components/movie"
import React, { useState, useEffect } from 'react';

export default function MovieRecommender() {
    const [initalRecs, setinitalRecs] = useState([]);

    const [ratings, setRatings] = useState({})

    const updateRating = (movieId, rating) => {
        setRatings((prevRatings) => ({
          ...prevRatings,
          [movieId]: rating,
        }));
      };

    useEffect(() => {
        fetch('https://jcrowell.net/api/movieapi/getInitialMovies', )
          .then(response => response.json())
          .then(json => setinitalRecs(json["recs"]))
          .catch(error => console.error(error));
      }, []);
    
    console.log(initalRecs);

    return (
    <div className="m-10">
    <h1 className='text-3xl pb-3'>Rate Inital Movies:</h1>
    <div className="grid grid-cols-10 gap-4">
        {initalRecs.map(([id,title]) => (
            <MovieCard 
                key={id}
                movieid={id} 
                title={title}
                rating={ratings[id]}
                onRatingChange={(rating) => updateRating(id,rating)}
            />
        ))}
    </div>
    </div>
    )
}