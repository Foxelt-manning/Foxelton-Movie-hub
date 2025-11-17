import React from 'react'
import { Link } from 'react-router-dom'

const Episodes = ({maxEp,subjectId,season}) => {

  
    const episodes =Array.from({length:maxEp},(_,i)=>i+1);
  return (
    <>
    <div className='all-movies'>
      {episodes.map(ep=>(
        <div key={ep}>
          <Link to={`/stream-download/${subjectId}?season=${season}&episode=${ep}&maxEp=${maxEp}`}>{ep}</Link>
          </div>
      ))}
    </div>
    </>
  )
}

export default Episodes