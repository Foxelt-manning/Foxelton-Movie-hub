import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Movie from '../components/MovieCard';
import Carousel from '../components/Carousel';

const Homepage = () => {
    const [movies,setMovies] = useState([]);
    const [trending,setTrending]= useState([]);

    useEffect(()=>{
        const fetchHomepage = async () =>{
            const res = await axios.get(`http://localhost:3000/api/home`);
            setMovies(res.data.movies);
        }
        fetchHomepage();

        const fetchTrending = async()=>{
            const res = await axios.get('http://localhost:3000/api/trending');
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
            <header>
            <h1>Top Picks</h1>
            </header>

            <section className='all-movies'>
                    <Carousel  items={movies}/>
            </section>

            <header>
                <h1>Trending</h1>
                <section className="all-movies">
                    <Carousel items={trending} />
                </section>
            </header>
        </div>
    </main>
        
    </>
  )
}

export default Homepage