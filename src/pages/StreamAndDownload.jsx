import React, { useEffect, useState } from 'react'
import Episodes from '../components/Episodes'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import Downloads from '../components/DownloadFiles'

const StreamAndDownload = () => {
  const [downloadData,setData] = useState(null)
  const {subjectId} =useParams()

  const location = useLocation();
  const queryParams =new URLSearchParams(location.search);
  const season = queryParams.get("season");
  const episode = queryParams.get("episode");
  const maxEp = queryParams.get("maxEp");


  useEffect(()=>{
    const fetchDownloadData = async()=>{
      const res = await axios.get(`http://localhost:3000/api/stream-download/${subjectId}?season=${season}&episode=${episode}`);
      const downloadData = res.data.downloads;
      setData(downloadData);

    }
    fetchDownloadData()
  },[episode,season,subjectId])
  console.log(downloadData)
  
  return (
    <>
    {downloadData ?(
      <>
      <div >
        <Downloads data={downloadData}/>
        <Episodes data={downloadData} subjectId={subjectId} season={season} maxEp={maxEp}/>
      </div>
      </>
    ):(<div>
      Loading ...
    </div>)}
   </>
  )
}

export default StreamAndDownload