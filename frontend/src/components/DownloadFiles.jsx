import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading';

const Downloads = ({data,allowBatch,setDownloadList,downloadList}) => {
  const [video,setVideo] =useState(data[0].stream_url);
  const [loading,setLoading]= useState(false);
  const videoRef = useRef(null);


  const handleQualityChange = (url) =>{
    setVideo(url);
    setLoading(true);

    setTimeout( ()=>{
      if(videoRef.current){
        videoRef.current.load();
        videoRef.current.play().catch(()=>{});
      }
    },50)
  }


  return (
    <>

  <div className="flex flex-col items-center gap-6 p-4">
    {loading &&(<Loading/>)}
  <video className="w-auto max-w-[95vw] h-[75vh] max-h-[95vh] rounded-lg shadow-lg border-2 border-red-500 " 
   ref={videoRef}
   key={video} 
   autoPlay
   controls>
    onWaiting={()=>setLoading(true)}
    onPlaying={()=>setLoading(false)}
    <source src={video}/>
  </video>
 <div>

 <p>Video quality</p>

 <select value={video} onChange={(e)=>handleQualityChange(e.target.value)} className='bg-blue-500'>
    {data.map((ep,i)=>(
      <option value={ep.stream_url} key={i} >{ep.quality}</option>
    ))}
    </select>
  </div>

  <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl">
    {data.map((ep, i) => (
      <div key={i} className="bg-gray-900 p-3 rounded-lg shadow hover:scale-105 transition-transform">
        <p className="text-sm text-gray-400">{ep.quality}</p>
        <p className="text-white">{(ep.size / (1024*1024)).toFixed(2)} MB</p>
        <a href={ep.download_url} className="bg-red-600 px-3 py-1 rounded mt-2 inline-block hover:bg-red-700">Download</a>
        <br />
        {allowBatch && (
          <button onClick={()=>setDownloadList(prev => [...prev,ep.download_url])}>
          Add to batch
          {console.log(downloadList)}
          </button>
          )}
      </div>
    ))}
  </div>
</div>
    </>
  )
}

export default Downloads