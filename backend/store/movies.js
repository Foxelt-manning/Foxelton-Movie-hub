import axios from 'axios';
import Movie from '../models/Movies.js';
import { BASE_API } from '../config/env.js';


 export async function StoreMoviesInDb(search,page){
    
    // Fetch movies by subjectId
       const url = page > 1
       ? `${BASE_API}search/${search}?page=${page}`
       : `${BASE_API}search/${search}`
            const dataFromApi= await axios.get(url);
            const moviesData = dataFromApi.data?.results?.items;
        
            let existingMovies = await Movie.find({subjectId:{$in: moviesData.map(m => m.subjectId)}}).distinct("subjectId");
            
            let newMovies = moviesData.filter(movies => !existingMovies.includes(movies.subjectId));
            
            if (newMovies.length > 0){
                console.log("All movies are already cached")
                await Movie.insertMany(newMovies,{ordered:false});
            } 

            return newMovies.length === 0 ? newMovies:moviesData
            


} 




