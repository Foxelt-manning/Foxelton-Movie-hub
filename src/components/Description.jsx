import React from 'react'
import { Link } from 'react-router-dom'

const Description = ({descriptionData}) => {
  if (!descriptionData) return <div>Loading ....</div>
 const{subjectId,title,genres,releaseDate,metadata,trailer,stars,seasons,imdbRatingValue,duration,countryName}=descriptionData;

  return (
    <>
    <h1>Description</h1>
    <h1>{title}</h1>
    <div className='movie-card'>
       <img src={metadata.image} alt={title} />
      <p>{genres?.join(" ")}</p>
      <p>{releaseDate}</p>
    </div>
    <div className='watch-now'>
      <Link to={`/stream-download/${subjectId}?season=${seasons[0].se}&episode=1&maxEp=${seasons[0].maxEp}`}>
      Watch
      </Link>
    </div>
    <div className="aside">
      <p>{metadata.description}</p>
      <p>{imdbRatingValue}</p>
      <p>{duration}</p>
      <p>{countryName}</p>
    </div>
    <div className='trailer'>
      <h2>Trailer</h2>
      <video controls  >
        <source src={trailer.videoAddress.url}  />
      </video>
      <img src={trailer.cover.url} alt="trailer pic" />
    </div>

    <div className="stars all-movies">
      <ul>
        {stars.map(i=>(
         <div className='movie-card' key={i.staffId}>
          <p>{i.name}</p>
          <img src={i.avatarUrl} alt={i.name} />
          <p>{i.staffType}</p>
          <p>{i.character}</p>
         </div>
         ))}
      </ul>
    </div>
    
   <div className="seasons">
  {seasons?.map((s, i) => (
    <div key={i}>
      <p>Season: {s.se}</p>
      <p>Episodes: {s.maxEp}</p>
      <p>Download Resolutions available:</p>
      <ul>
        {s.resolutions?.map((r, j) => (
          <li key={j}>
            {r.resolution}p - Episodes: {r.epNum}
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>

     </>
  )
}

export default Description