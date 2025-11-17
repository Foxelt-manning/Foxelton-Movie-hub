import React from 'react'
import { Link } from 'react-router-dom'

const Downloads = ({data}) => {
if (!data) return <div>Loading .... </div>

  return (
    <>
  <div className="flex flex-col items-center gap-6 p-4">
  <video className="w-full max-w-3xl h-[400px] rounded-lg shadow-lg"  controls>
    <source src={data[0].stream_url}/>
  </video>

  <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl">
    {data.map((ep, i) => (
      <div key={i} className="bg-gray-900 p-3 rounded-lg shadow hover:scale-105 transition-transform">
        <p className="text-sm text-gray-400">{ep.quality}</p>
        <p className="text-white">{(ep.size / (1024*1024)).toFixed(2)} MB</p>
        <a href={ep.download_url} className="bg-red-600 px-3 py-1 rounded mt-2 inline-block hover:bg-red-700">Download</a>
      </div>
    ))}
  </div>
</div>
    </>
  )
}

export default Downloads