import React from 'react'
import { Link } from 'react-router-dom'

const Episodes = ({maxEp,subjectId,season}) => {

  
    const episodes =Array.from({length:maxEp},(_,i)=>i+1);
  return (
    <>

    <div className="episodes-container mt-6 flex flex-col items-center">
  <h2 className="text-xl font-bold mb-3">Episodes</h2>

  {/* Scrollable container */}
  <div className="w-2/3 max-w-4xl overflow-auto scrollbar-hide">
    {/* Grid for episodes */}
    <div className="grid grid-cols-5 gap-3">
      {episodes.map((ep) => (
        <Link
          key={ep}
          to={`/stream-download/${subjectId}?season=${season}&episode=${ep}&maxEp=${maxEp}`}
          className="h-12 flex items-center justify-center bg-gray-800 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
        >
          {ep}
        </Link>
      ))}
    </div>
  </div>
</div>

    </>
  )
}

export default Episodes