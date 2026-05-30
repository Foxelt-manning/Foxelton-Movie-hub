import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getMovieDetailsById, IMG_BASE } from '../utils/tmdb'
import { useParams } from 'react-router-dom'
import Description from '../components/Description'

const API_URL = import.meta.env.VITE_API_URL
const MovieDetails = () => {
    const {subjectId} =useParams()

    const [description,setDescription]=useState(null)

    useEffect(()=>{
        const fetchDescription = async()=> {
          try{
            // If subjectId indicates a TMDB id, fetch client-side
            if (subjectId && subjectId.startsWith('tmdb-')){
              const tmdbId = subjectId.replace('tmdb-','')
              const tm = await getMovieDetailsById(tmdbId)
              if (tm){
                // construct a shape similar to backend descriptionData
                const mapped = {
                  subjectId: `tmdb-${tmdbId}`,
                  title: tm.title || tm.original_title,
                  genre: (tm.genres || []).map(g=>g.name),
                  releaseDate: tm.release_date,
                  trailer: {},
                  stars: [],
                  seasons: [],
                  imdbRatingValue: '',
                  duration: tm.runtime || 0,
                  countryName: (tm.production_countries || []).map(c=>c.name),
                  cachedAt: new Date(),
                    metadata: { ...tm, image: tm.poster_path ? IMG_BASE + tm.poster_path : '' , description: tm.overview }
                }
                setDescription(mapped)
                return
              }
            }

            const res = await axios.get(`${API_URL}/details/${subjectId}`)
            const descriptionData = res.data.details;
            setDescription(descriptionData);
          }catch(err){
            console.error(err)
          }
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