import React from 'react'
import { Link } from 'react-router-dom'

const Episodes = ({maxEp,subjectId,season}) => {

  
    const episodes =Array.from({length:maxEp},(_,i)=>i+1);
  return (
    <>

    <div className="episodes-container mt-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-3">Episodes</h2>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide justify-center w-full max-w-4xl">
        {episodes.map((ep) => (
          <Link
            key={ep}
            to={`/stream-download/${subjectId}?season=${season}&episode=${ep}&maxEp=${maxEp}`}
            className="min-w-6 h-5 flex items-center justify-center bg-gray-800 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 shrink-0"
          >
            {ep}
          </Link>
        ))}
      </div>
    </div>
    </>
  )
}

export default Episodes