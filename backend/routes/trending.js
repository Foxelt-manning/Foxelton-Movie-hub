import express, { Router } from 'express';
import axios from 'axios';
import {BASE_API} from "../config/env.js"

 const router = express.Router();

    router.get("/trending", async (req,res)=>{
        try {
            const response = await axios.get(`${BASE_API}trending`);
              const data = response.data?.results?.subjectList || [];


            res.json({ trendingData: data });
        } catch (error) {
            console.error("Error fetching trending data:", error);
            res.status(500).json({ error: "Failed to fetch trending data" });   
        }
    });
     export default router;