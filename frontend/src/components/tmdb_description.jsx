import React from 'react'

const tmdb_description = ({data}) => {
  const {backdrop_path,genres,original_title,release_date,runtime,overview,tagline}= data.results

  const img ="https://image.tmdb.org/t/p/w500/"
  return (
    <>
    <div>tmdb_description</div>
    <p>image</p>
    <img src={img+backdrop_path}  alt="" />
    <p>{genres.map((i,d)=>(
      <p>{d.name}</p>
    ))}</p>
    <p>{original_title}</p>
    <p>{overview}</p>
   <p>{release_date}</p>
   <p>Runtime{runtime}</p>
   <p>{tagline}</p>
    </>
  )
}

export default tmdb_description