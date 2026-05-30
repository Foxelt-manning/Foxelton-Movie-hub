import express, { Router } from 'express';
import Movie from '../models/Movies.js';
import { StoreMoviesInDb } from '../store/movies.js';

 const router = express.Router();


    router.get("/search/:query", async (req,res)=>{
       const { query } = req.params;
       const page = Number(req.query.page) || 1;
       const normalizedQuery = query.trim();
       
       if (!normalizedQuery || normalizedQuery.length < 3) {
           return res.status(400).json({ message: "Query must be at least 3 characters long" });
        }
        try {
            const regex = new RegExp(normalizedQuery, 'i'); // Case-insensitive regex
            const cachedMovies = await Movie.find({
                searchQuery: normalizedQuery,
                page,
                $or:[
                {title: regex },
                {genre : regex}   
                 ] 
        });

       
            if (cachedMovies.length > 0) {
                return res.json({ message: "success", movies: cachedMovies });
            }

            const newMovies = await StoreMoviesInDb(normalizedQuery,page);
            res.json({ message: "fetched from API", movies: newMovies });
            
        } catch (error) {
            console.error("Something is wrong with search api",error)
            return res.status(500).json({ message: "Search failed", error: error.message })
        }

    }); export default router;
