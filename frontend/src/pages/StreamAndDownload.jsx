import React, { useEffect, useState } from 'react'
import Episodes from '../components/Episodes'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import Downloads from '../components/DownloadFiles'
import Loading from '../components/Loading'
const API_URL = import.meta.env.VITE_API_URL
const StreamAndDownload = () => {
  const [downloadData,setData] = useState(null);
  const [loading,setLoading]=useState(true);
  const {subjectId} =useParams()
  const [downloadList,setDownloadList] =useState([]);
  const [allowBatch, setAllowBatch] = useState(false);

  const location = useLocation();
  const queryParams =new URLSearchParams(location.search);
  const season = queryParams.get("season");
  const episode = queryParams.get("episode");
  const maxEp = queryParams.get("maxEp");


const downloadBatch = () => {
  downloadList.forEach((url, index) => {
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = url;
      a.download = "";
      a.style.display = "none";

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, index * 300);
  });
};


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
      <div className='pattern'>
      <div className='grid col-auto' >
        {!allowBatch &&(
             <button onClick={()=> setAllowBatch(true)} className='fixed right-0 m-6 border-4 border-green-300 bg-blue-400 transition-all px-3 py-3 rounded-lg z-50'
             >Batch download</button>
        )}
        {allowBatch &&(
          <>
          <button onClick={()=>downloadBatch()} className="fixed right-0 m-6 border-4 border-yellow-300 bg-transparent transition-all px-3 py-3 rounded-lg z-50">Start Download</button>
          </>
        )}
        <Downloads data={(downloadData)} allowBatch={(allowBatch)} setAllowBatch={(setAllowBatch)} downloadList={(downloadList)} setDownloadList={(setDownloadList)}/>
        <Episodes data={downloadData} subjectId={subjectId} season={season} maxEp={maxEp}/>
      </div>
      </div>
      </>
    ):(<div>
      <Loading/>
    </div>)}
   </>
  )
}

export default StreamAndDownload