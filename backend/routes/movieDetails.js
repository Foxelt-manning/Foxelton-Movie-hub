import express, { Router } from 'express';
import Movie from '../models/Movies.js';
import StoreDescriptionInDb from '../store/description.js';

 const router = express.Router();

 function CheckandStoreDetails (){
     router.get("api/details/:subjectId", async (req,res)=>{
        const {subjectId} = req.params;

        try {
                const cachedDetails = await find({
                    subjectId:{$in :subjectId}
                });

                if (cachedDetails.length > 0){
                    return res.json({message:"success",details:cachedDetails})
                }

                const newDetails = await StoreDescriptionInDb(subjectId);
                res.json({message:"cached description successfully",details:newDetails})

        } catch(error) {
            console.error("Error fetching details check details Api",error)
        }
     })
 } export default CheckandStoreDetails

