import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from './Carousel';

const Description = ({descriptionData}) => {

    if (!descriptionData || descriptionData.length === 0) return <div>Loading ....</div>
    let data =descriptionData[0]
    const{subjectId,title,genre,releaseDate,metadata,trailer,stars,seasons,imdbRatingValue,duration,countryName}=data;
   

  return (
    <div className="description-page"
        style={{backgroundImage:`url(${metadata.image})`}}
      >
       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div className='relative z-10 max-w-6xl mx-auto px-4 py-12 flex flex-col gap-10'>

        <h1>{title}</h1>
     <div className='movie-details movie-card p-5 text-gray-600'>
     <div className='poster relative w-full md:w-1/3 h-64 md:h-[420px] rounded-lg overflow-hidden'>
        {/* poster image */}
        <img
          src={metadata?.image || '/no-movie.png'}
          alt={title}
          className='w-full h-full object-cover'
        />

    {/* overlay with badges (inside poster so absolute is positioned correctly) */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none items-end">
          <span className='genre-border inline-block px-3 py-1 rounded-md text-sm pointer-events-auto'>
            {genre?.join(" ")}
          </span>

          <span className='date-border inline-block px-3 py-1 rounded-md text-sm pointer-events-auto'>
            {releaseDate}
          </span>
        </div>
     </div>

 <div className="description flex-1 space-y-6">
  {/* Movie/Series Description */}
  <p className="text-gray-300">{metadata?.description}</p>

  {/* Seasons / Watch Section */}
  <div className="watch-now space-y-4">
    {seasons?.map((s, i) => (
      <div key={i} className="details flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 bg-dark-100 rounded-2xl shadow-lg items-center">
        {s.se > 0 ? (
          <div className="flex flex-col gap-1">
            <span>Season: {s.se}</span>
            <span>Episodes: {s.maxEp}</span>
            <span>Download Resolutions available:</span>
          </div>
        ) : (
          <p>Movie</p>
        )}
        <Link
          to={`/stream-download/${subjectId}?season=${s.se}&episode=1&maxEp=${s.maxEp}`}
          className="watch-btn mt-2 md:mt-0"
        >
          Watch
        </Link>
      </div>
    ))}
  </div>

  {/* Movie Details */}
  <div className="details flex flex-wrap items-center gap-4 p-4 bg-dark-100 rounded-2xl shadow-lg">
    <span className="flex items-center gap-1">
      <img src="/star.svg" alt="star" className="w-4 h-4" />
      {imdbRatingValue}
    </span>
    <p>{Math.floor(duration / 3600)}hr {Math.floor((duration % 3600) / 60)}min</p>
    <p>{countryName}</p>
  </div>
</div>
</div>

      
          <h2 className='text-xl font-semibold'>Trailer</h2>
      <div className='trailer p-4 movie-card rounded-2xl'>
        <div className="w-full md:w-1/2">
          <video controls  className='aspect-video rounded-2xl'>
            <source src={trailer.videoAddress ?trailer.videoAddress.url : "/public/no-movie.png"}  />
          </video>
        </div>
        <div className="w-full md:w-1/2">
            <img 
            src={trailer.cover ? trailer.cover.url: "/public/no-movie.png"} 
            alt="trailer pic"
            className='aspect-video rounded-2xl max-h-[300px] '
            />
        </div>
      </div>

      <div className="stars all-movies">
        
            <Carousel items={stars} renderItem={(item)=>(
          <div className='movie-card' key={item.character}>
            <p>{item.name}</p>
            <img src={item.avatarUrl? item.avatarUrl:"/public/no-movie.png"} alt={item.name} className='min-w-[180px] h-[200px]'/>
            
            <p> As {item.character}</p>
          </div>
            )}
          />
      </div>
      
  </div>

     </div>
  )
}

export default Description