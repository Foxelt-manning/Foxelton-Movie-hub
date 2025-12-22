import React from 'react'
import { Link } from 'react-router-dom'

const Movie = ({movie}) => {

const {subjectId,title,releaseDate,genre,cover} = movie




  return (
    <>
    <Link to={`/movie/${subjectId}`}>
   <div className="movie-card relative rounded-2xl overflow-hidden w-full">
  {/* Movie Image */}
  <img
    src={cover.url || "/no-movie.png"}
    alt={title}
    className="min-w-[180px] h-[260px] object-cover"
    />

  {/* Semi-transparent overlay */}
  {/* <div className=" absolute inset-0 bg-black/40"></div> */}

  {/* Texts on top */}
  <div className="absolute inset-0 flex flex-col justify-between p-4">
    <div className="movie-spacing">
      <span className="year date-border ">{ releaseDate ? releaseDate.split("-")[0]:"N/A"}</span>
      <span className="lang genre-border">{genre ? genre :"N/A"}</span>
    </div>

     <h3 className="movie-spacing  title-border">{title}</h3>

  </div>
</div>
    </Link>

    </>
  )
}

export default Movie