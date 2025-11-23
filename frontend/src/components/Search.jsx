import axios from 'axios'
import { SearchCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Movie from './MovieCard'

const Search = () => {
    const [search,setSearch]=useState("")
    const [movies,setMovies]=useState([])

    const {query} = useParams();
    const navigate =useNavigate()

    const searchQuery =async(q)=>{
        if(!q) return;
        try{
            const res = await axios.get(`http://localhost:3000/api/search/${q}`)
            const movieList = res.data.movies;
            setMovies(movieList);
        }catch(error){
            console.error(error);
        }
        }
        useEffect(()=>{
            if(query && query.length >3){
                setSearch(query)
                searchQuery(query)

            }
        },[query])

        const handleClick=()=>{
            if(search.trim().length > 3){
                navigate(`/search/${encodeURIComponent(search.trim())}`)
            }
        }
   
    
  return (
   <>
        <div className="search">
            <div>
                <img src="/search.svg" alt="search" 
                onClick={()=>handleClick()}
                />
                <input 
                type="text"
                placeholder='Search through a multiverse of movies'
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                onKeyDown={(e)=> e.key === "Enter" && handleClick()}
            />
            </div>
        </div>
            <div className='all-movies'>    
                <ul>

         {movies.map((movie)=>(
             <div key={movie.subjectId}>
                <Movie movie={movie}/>
            </div> 
        ))}
        </ul>
            </div>
   </>
  )
}

export default Search