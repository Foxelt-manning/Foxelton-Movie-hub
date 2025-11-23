import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Description from '../components/Description'

const API_URL = import.meta.env.VITE_API_URL
const MovieDetails = () => {
    const {subjectId} =useParams()

    const [description,setDescription]=useState(null)

    useEffect(()=>{
        const fetchDescription = async()=> {
            const res = await axios.get(`${API_URL}}/details/${subjectId}`)
            const descriptionData = res.data.details;
            setDescription(descriptionData);
        }
        fetchDescription()
    },[subjectId])
  return (
    <>
    <main>
      <div>
        <Description descriptionData={description}/>
      </div>
    </main>
    </>
  )
}

export default MovieDetails