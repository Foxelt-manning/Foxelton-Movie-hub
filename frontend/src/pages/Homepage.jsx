import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Movie from '../components/MovieCard';
import Carousel from '../components/Carousel';
import Search from '../components/Search';

const API_URL = import.meta.env.VITE_API_URL
const Homepage = () => {
    const [movies,setMovies] = useState([]);
    const [trending,setTrending]= useState([]);

    useEffect(()=>{
        const fetchHomepage = async () =>{
            const res = await axios.get(`${API_URL}/home`);
            setMovies(res.data.movies);
        }
        fetchHomepage();

        const fetchTrending = async()=>{
            const res = await axios.get(`${API_URL}/trending`);
            const newData = res.data.trendingData
            setTrending(newData);
        }
        fetchTrending();
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
            </header>
        </div>
    </main>
        
    </>
  )
}

export default Homepage