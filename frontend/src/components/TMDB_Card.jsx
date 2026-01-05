import React from 'react'
import { Link } from 'react-router-dom'

const TMDB_CARD = ({movie}) => {

const {id,title,release_date,genre_ids,backdrop_path,overview} = movie

const img ="https://image.tmdb.org/t/p/w500"


  return (
    <>
    <Link to={`/movie/${id}`}>
    yello my {id}
    {console.log(movie)}
   <div className="movie-card relative rounded-2xl overflow-hidden w-full">
  {/* Movie Image */}
  <img
    src={img+"/"+backdrop_path|| "/no-movie.png"}
    alt={title}
    className="min-w-[180px] h-[260px] object-cover"
    />

  {/* Semi-transparent overlay */}
  {/* <div className=" absolute inset-0 bg-black/40"></div> */}

  {/* Texts on top */}
  <div className="absolute inset-0 flex flex-col justify-between p-4">
    <div className="movie-spacing">
      <span className="year date-border ">{ release_date ? release_date.split("-")[0]:"N/A"}</span>
      <span className="lang genre-border">{genre_ids ? genre_ids :"N/A"}</span>
    </div>

     <h3 className="movie-spacing  title-border">{title}</h3>
     <p>{overview}</p>

  </div>
</div>
    </Link>

    </>
  )
}

export default TMDB_CARD