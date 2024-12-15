import Image from "next/image"
import StarRating from "./starrating"

export default function MovieCard({children, movieid, title, rating, onRatingChange}) {
    return (
        <>
        <div className="flex flex-col items-center h-75">
            <img
                src = {`https://liangfgithub.github.io/MovieImages/${movieid}.jpg?raw=true`}
                //className='rounded-[80px] transition-all hover:-translate-y-1 hover:rounded-[40px] duration-300'
                height={150}
                width={100}
            />
            <div className="h-14 text-sm text-center">
            <p>{title}</p>
            </div>
            <StarRating rating={rating} onRatingChange={onRatingChange}/>
        </div>
        </>
    )
}