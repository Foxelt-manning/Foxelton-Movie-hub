import express, { Router } from 'express';
import {BASE_API} from "../config/env.js"
import Movie from '../models/Movies.js';
import { StoreMoviesInDb } from '../store/movies.js';

 const router = express.Router();


    router.get("/search/:query", async (req,res)=>{
       const { query } = req.params;
       
       if (!query || query.length < 3) {
           return res.json({ message: "Query must be at least 3 characters long" });
        }
       
        try {

            const regex = new RegExp(query, 'i'); // Case-insensitive regex
            const cachedMovies = await Movie.find({$or:[
                {title: regex },{genre : regex}
            ] });

       
            if (cachedMovies.length > 0) {
                return res.json({ message: "success", movies: cachedMovies });
            }

            const newMovies = await StoreMoviesInDb(query);
            res.json({ message: "fetched from API", movies: newMovies });
            
        } catch (error) {
            console.error("Something is wrong with home api",error)
        }

    }); export default router;
