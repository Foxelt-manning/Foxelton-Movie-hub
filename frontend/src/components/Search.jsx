import axios from 'axios'
import { SearchCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Movie from './MovieCard'
import Loading from './Loading'
const API_URL = import.meta.env.VITE_API_URL
const Search = () => {
    const [search,setSearch]=useState("");
    const [movies,setMovies]=useState([]);

    const navigate =useNavigate()
    const {query} = useParams();

    const  [queryParams] = useSearchParams();
    const page = Number(queryParams.get("page")) || 1;

    const searchQuery =async(q,page)=>{
        if(!q) return;
        try{
            const res = await axios.get(`${API_URL}/search/${q}?page=${page}`)
            const movieList = res.data.movies;
            setMovies(movieList);
        }catch(error){
            console.error(error);
        }
        }
        useEffect(()=>{
            if(query && query.length >3){
                setSearch(query)
                searchQuery(query,page)

            }
        },[query,page])
        const handleNext=()=>{
           navigate(`/search/${query}?page=${page + 1}`)
        }

        const handlePrevious=()=>{
            if(page > 1){
                navigate(`/search/${query}?page=${page - 1}`)
            }
        }
        

        const handleClick=()=>{
            if(search.trim().length >= 3){
                setMovies([]);
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

        {movies.length > 1 ? (
            
            <ul>
            {movies.map((movie)=>(
                <div key={movie.subjectId}>
                   <Movie movie={movie}/>
               </div> 
           ))}
           </ul>
        ):(
            query && movies.length < 1 &&(        <Loading/>   ) )
        }
            </div>
<div className='flex justify-center'>
            {page >1 &&(
                < button
                className='watch-btn mt-4'
                onClick={()=>handlePrevious()}
                >
                    Previous
                </button>
            )}

            {movies.length >=30 &&(
                 < button
                className='watch-btn mt-4'
                onClick={()=>handleNext()}
                >
                    Next
                </button>
            )}
</div>
   </>
  )
}

export default Search