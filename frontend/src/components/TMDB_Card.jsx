import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IMG_BASE, searchAndFind } from '../utils/tmdb'

const TMDB_CARD = ({movie}) => {
  const navigate = useNavigate()

const {id,title,release_date,genre_ids,backdrop_path,overview} = movie

const img ="https://image.tmdb.org/t/p/w500"

// TMDB Genre ID to Name mapping
const genreMap = {
  28: "Action",
  12: "Adventure", 
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

// Convert genre IDs to genre names
const getGenreNames = (ids) => {
  if (!ids || !Array.isArray(ids)) return [];
  return ids.map(id => genreMap[id] || `Genre ${id}`).slice(0, 3); // Max 3 genres
};


  const onClick = (e) => {
    e.preventDefault()
    ;(async ()=>{
      try{
        const year = release_date ? release_date.split('-')[0] : null
        const pick = await searchAndFind(title, year)
        const targetId = pick ? pick.id : id
        navigate(`/movie/tmdb-${targetId}`)
      }catch(err){
        console.error(err)
        navigate(`/movie/tmdb-${id}`)
      }
    })()
  }

  return (
    <>
   <a onClick={onClick} href={`/movie/tmdb-${id}`} className="no-underline">
   <div className="movie-card relative rounded-2xl overflow-hidden w-full">
  {/* Movie Image */}
  <img
    src={(backdrop_path ? IMG_BASE + backdrop_path : "/no-movie.png")}
    alt={title}
    className="min-w-[180px] h-[260px] object-cover"
    />

  {/* Semi-transparent overlay */}
  {/* <div className=" absolute inset-0 bg-black/40"></div> */}

  {/* Texts on top */}
  <div className="absolute inset-0 flex flex-col justify-between p-4">
    <div className="movie-spacing flex flex-wrap gap-1 items-start">
      <span className="year date-border">{ release_date ? release_date.split("-")[0]:"N/A"}</span>
      <div className="flex flex-wrap gap-1">
        {getGenreNames(genre_ids).map((genre, index) => (
          <span key={index} className="lang genre-border text-xs px-1 py-0.5">
            {genre}
          </span>
        ))}
      </div>
    </div>

     <h3 className="movie-spacing title-border">{title}</h3>
     {/* <p>{overview}</p> */}

  </div>
</div>
    </a>

    </>
  )
}

export default TMDB_CARD