import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Movie from '../components/MovieCard';
import Carousel from '../components/Carousel';
import Search from '../components/Search';
import TMDB_CARD from '../components/TMDB_Card';

const API_URL = import.meta.env.VITE_API_URL
const TMDB_TOKEN = import.meta.env.TMDB_API_TOKEN
const Homepage = () => {
    const [movies,setMovies] = useState([]);
    const [trending,setTrending]= useState([]);
    const [tmdb,setTmdb]=useState([])

    useEffect(()=>{
        const fetchData= async ()=>{
            try{
            const fetchHomepage = async () =>{
                const res = await axios.get(`${API_URL}/home`);
                setMovies(res.data.movies);
            }
            fetchHomepage();
            
            await new Promise(r =>setTimeout(r,200));
            
            const fetchTrending = async()=>{
                const res = await axios.get(`${API_URL}/trending`);
                const newData = res.data.trendingData
                setTrending(newData);
            }
            fetchTrending();


            const fetchTMDB = async() =>{
                
                const url = "https://api.themoviedb.org/3/discover/movie"
                const options ={
                    params:{
                        include_video:true,
                        include_adult:true,
                        language:"en-US",
                        sort_by:"popularity.desc"
                    },headers:{
                        accept:"application/json",
                        Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzU3NzU3ZWI1NDUzMGRjZTYxYjc0YWYxYTIwMWVkNyIsIm5iZiI6MTc2MTY1NDAzMi4zNDcwMDAxLCJzdWIiOiI2OTAwYjUxMDJjYjIxZjkzMGFiYzA2OTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.R9SaOopKE5jg_LyTYu_qBVwpDFkrgvR9yB7Dg8B6Pys`
                    }
                }
                const res = await axios.get(url,options)
                const TMDB = res.data.results
                setTmdb(TMDB);

                console.log(TMDB);
            }
            fetchTMDB();
        }
        catch(error){
            console.error(error)
        }
        }
        fetchData();
    },[])



  return (
    <>
    <main>
        <div className="pattern"/>
        <div className="wrapper">
            <Search/>
            <header>
            <h1>Top Picks</h1>
            </header>

            <section className='all-movies'>
                    <Carousel  items={movies}
                    renderItem={(item)=>(<Movie movie={item}/>)}
                    />
            </section>

            <header>
                <h1>Trending</h1>
                <section className="all-movies">
                    <Carousel items={trending}
                        renderItem={(item)=>(
                            <Movie movie={item}/>
                        )}
                    />
                </section>
                

                <h1>DISCOVER</h1>
                <section className="all-movies">
                    <ul>
               {tmdb.map((movie)=>(
                <div key={movie.id}>
                    <TMDB_CARD movie={movie}/>  
                  
               </div> 
           ))}
           </ul>
                </section>
            </header>
        </div>
    </main>
        
    </>
  )
}

export default Homepage