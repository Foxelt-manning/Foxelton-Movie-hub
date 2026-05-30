import React, { useEffect, useState } from 'react'
import Episodes from '../components/Episodes'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import Downloads from '../components/DownloadFiles'
import Loading from '../components/Loading'
import { Check, X } from 'lucide-react'
const API_URL = import.meta.env.VITE_API_URL
const StreamAndDownload = () => {
  const [downloadData,setData] = useState(null);
  const [loading,setLoading]=useState(true);
  const {subjectId} =useParams()
  const [batchSelections, setBatchSelections] = useState({});
  const [allowBatch, setAllowBatch] = useState(false);

  const location = useLocation();
  const queryParams =new URLSearchParams(location.search);
  const season = queryParams.get("season");
  const episode = queryParams.get("episode");
  const maxEp = queryParams.get("maxEp");
  const batchKey = `${subjectId || 'unknown'}:${season || 'movie'}:${episode || '1'}`
  const downloadList = batchSelections[batchKey] || []

  const setDownloadList = (nextValue) => {
    setBatchSelections((prev) => {
      const currentList = prev[batchKey] || []
      const updatedList = typeof nextValue === 'function' ? nextValue(currentList) : nextValue

      return {
        ...prev,
        [batchKey]: updatedList,
      }
    })
  }


const downloadBatch = () => {
  downloadList.forEach((item, index) => {
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = item.url;
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

  useEffect(() => {
    setAllowBatch(false)
  }, [batchKey])
  console.log(downloadData)
  
  return (
    <>
    {!loading && downloadData ?(
      <>
      <div className='pattern'>
      <div className='grid col-auto' >
        <div className="fixed right-4 top-24 z-50 flex flex-col gap-3">
          <button
            onClick={() => setAllowBatch(prev => !prev)}
            className={`border-2 px-4 py-3 rounded-xl font-semibold transition-all backdrop-blur ${
              allowBatch
                ? 'border-red-300 bg-red-500/80 text-white'
                : 'border-green-300 bg-blue-400 text-white'
            }`}
          >
            {allowBatch ? 'Close batch mode' : 'Batch download'}
          </button>

          {allowBatch && downloadList.length > 0 && (
            <button
              onClick={downloadBatch}
              className="border-2 border-yellow-300 bg-transparent px-4 py-3 rounded-xl font-semibold text-white transition-all backdrop-blur"
            >
              Start Download
            </button>
          )}
        </div>

        {allowBatch && (
          <aside className="fixed right-4 top-44 z-40 w-[min(92vw,22rem)] rounded-2xl border border-white/10 bg-[#0f0d23]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-cyan-300">Selected Movies</p>
                <p className="text-xs text-gray-400">
                  {downloadList.length} selected for subject {subjectId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDownloadList([])}
                className="rounded-full p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Clear selected downloads"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 max-h-[55vh] space-y-3 overflow-y-auto pr-1">
              {downloadList.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-gray-400">
                  No downloads selected yet. Add some download options from the cards.
                </div>
              ) : (
                downloadList.map((item) => (
                  <div key={item.url} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.resolution || 'Download option'}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.size || 'Size unavailable'}
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                          {item.season ? `Season ${item.season}` : 'Movie'}
                          {item.episode ? ` • Episode ${item.episode}` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDownloadList(prev => prev.filter(i => i.url !== item.url))}
                          className="rounded-full p-1 text-red-400 transition-colors hover:bg-white/10 hover:text-white"
                          aria-label="Remove from batch"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <Check className="h-4 w-4 text-green-400" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        )}

        <Downloads data={(downloadData)} allowBatch={(allowBatch)} setAllowBatch={(setAllowBatch)} downloadList={(downloadList)} setDownloadList={(setDownloadList)} season={season} episode={episode} subjectId={subjectId}/>
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