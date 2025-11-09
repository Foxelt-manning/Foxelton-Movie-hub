import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Movie from './components/Movie'

const SearchMovies = 'https://movieapi.giftedtech.co.ke/api/search/Black%20panther'

function App() {

const [movieList,setMovieList]=useState([])
const[searchedTerm,setSearchedTerm]=useState("Batman")
  useEffect(()=>{
    const fetchMovies = async() => {
      try{
        const response = await axios.get(`https://movieapi.giftedtech.co.ke/api/search/${searchedTerm}`)
        console.log(response.data?.results?.items)
        setMovieList(response.data?.results?.items || [])
      }catch(e){
        console.log("Error in reading", e);
      }
    };
    fetchMovies();
  },[searchedTerm])


  return (
 <>
 <div>
  
  <input type="text" value={searchedTerm} onChange={(e)=>setSearchedTerm(e.target.value)} />
  <div className="all-movies">
  <ul>
  {movieList.map((movies)=>(
    <Movie movie={movies} key={movies.subjectId}/>
  ))}
  </ul>
  </div>
  
 </div>

 </>
  )
}

export default App
