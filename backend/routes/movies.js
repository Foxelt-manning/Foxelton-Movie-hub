import express, { Router } from 'express';
import axios from 'axios';
import {BASE_API} from "../config/env.js"

 const router = express.Router();


   const HomeApi = router.get("home", async (req,res)=>{
        try {
            
            const response = await axios.get(`${BASE_API}/api/homepage`);

            const data = response.data?.results?.operatingList || [];
            let movieList = []

            data.forEach( item =>{ 
                const value = item?.banner?.items
                if (value){
                    movieList.push(...value.subject)
                }
            })

            res.json({ movies: movieList });
            
        } catch (error) {
            console.error("Something is wrong with home api",error)
        }
        
    }) ; export default HomeApi

