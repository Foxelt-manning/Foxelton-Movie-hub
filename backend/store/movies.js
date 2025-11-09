import express from 'express';
import axios from 'axios';
import Movie from '../models/Movies.js';
import { BASE_API } from '../config/env.js';


function StoreMoviesInDb(search){

    const router = express.Router();
    
    // Fetch movies by subjectId
    router.post('/movies/store/:subjectId', async (req, res) => {
        const { subjectId } = req.params;
        
        try{
            const dataFromApi= await axios.get(`${BASE_API}/search/${search}`);
            const moviesData = dataFromApi.data?.results?.items;
            
            let existingMovies = await Movie.find({subjectId:{$in: subjectId}}).distinct("subjectId");
            
            let newMovies = moviesData.filter(movies => !existingMovies.includes(movies.subjectId));
            
            if (newMovies.length === 0){
                console.log("All movies are already cached")
                return res.json({message:"Movies have already been cached",added:0})
            }
            
            await Movie.insertMany(newMovies,{ordered:false});
            
            res.json({
                message:`Cached ${newMovies.length} movies`,
                totalFetched: moviesData.length,
                totalExisting: existingMovies.length,
                totalCached: newMovies.length
            })
            
}catch(error){
    console.error("Unable to cache data to database",error);
    res.status(500).json({message:"Internal Server Error"});
    
}
})
} export default StoreMoviesInDb;




