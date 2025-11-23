import React, { useEffect, useState } from 'react'
import Episodes from '../components/Episodes'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import Downloads from '../components/DownloadFiles'
const API_URL = import.meta.env.VITE_API_URL
const StreamAndDownload = () => {
  const [downloadData,setData] = useState(null);
  const [loading,setLoading]=useState(true);
  const {subjectId} =useParams()

  const location = useLocation();
  const queryParams =new URLSearchParams(location.search);
  const season = queryParams.get("season");
  const episode = queryParams.get("episode");
  const maxEp = queryParams.get("maxEp");


  useEffect(()=>{
    const fetchDownloadData = async()=>{
      setLoading(true);
      setData(null);
      try {
        
        const res = await axios.get(`${API_URL}/stream-download/${subjectId}?season=${season}&episode=${episode}`);
        
        const downloadData = res.data.downloads;
        setData(downloadData);
      } catch (error) {
        console.error(error)
      }
      setLoading(false)

    }
    fetchDownloadData()
  },[episode,season,subjectId])
  console.log(downloadData)
  
  return (
    <>
    {!loading && downloadData ?(
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