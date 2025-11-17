import React from 'react'
import { Link } from 'react-router-dom'

const Downloads = ({data}) => {
if (!data) return <div>Loading .... </div>

  return (
    <>
    <div>
          <video controls>
            <source src={data[0].stream_url}/>
          </video>
      {data.map((ep,i)=>(
        <div key={i}>
          <p>Download</p>
          <p> <a href={ep.download_url}>{ep.quality}</a> &nbsp; &nbsp; &nbsp; size:{(ep.size/(1024*1024)).toFixed(2)}MB</p>
          </div>
      ))}
    </div>
    </>
  )
}

export default Downloads