import express, { Router } from 'express';
import Movie from '../models/Movies.js';
import StoreDescriptionInDb from '../store/description.js';
import DescriptionModel from '../models/Description.js';

 const router = express.Router();

 
     router.get("/details/:subjectId", async (req,res)=>{
        const {subjectId} = req.params;

        try {
                const cachedDetails = await DescriptionModel.find({
                    subjectId:subjectId
                });

                if (cachedDetails.length > 0){
                    return res.json({message:"success",details:cachedDetails})
                }

                const newDetails = await StoreDescriptionInDb(subjectId);
                if (!newDetails) {
                    // upstream API returned no data
                    return res.status(404).json({ message: 'No description data found for this subjectId' })
                }
                return res.json({message:"cached description successfully",details:newDetails})

        } catch(error) {
            console.error("Error fetching details check details Api",error)
            return res.status(500).json({ message: 'Internal server error', error: error.message })
        }
     }); export default router;


