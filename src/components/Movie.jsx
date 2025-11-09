import axios from 'axios'
import React, { useEffect, useState } from 'react'
const Movie = ({movie:{subjectId,title,releaseDate,genre,countryName,imdbRating,cover}}) => {
   
   const[downloadFilesList,setDownloadFilesList]=useState([])

   useEffect(()=>{
       
       const Download = async()=>{
           const response =  await axios.get(`https://movieapi.giftedtech.co.ke/api/sources/${subjectId}`)
           const downloadfiles =response.data.results
           setDownloadFilesList(downloadfiles)
           console.log(downloadfiles)
       };

       Download();
   },[subjectId])
  return (
    <>
    <div>{title}</div>
    <img src={cover.url} alt={title} />
    <p>{releaseDate}. {countryName}</p>
    <p>Genre:{genre},Rating:{imdbRating}</p>
    <div>{downloadFilesList.map((files)=>(<>
    
        <div key={files.id}>
            <p>
            {files.quality}
           {console.log(files.quality)}
            </p>
            <p>
            <a href={files.download_url}>Download Here</a>
             {(files.size/1_000_000).toFixed(2)} MB
            </p>

        </div>
    </>
    ))}</div>
    </>
  )
}

export default Movie