import express from 'express';
import axios from 'axios';
import DescriptionModel from '../models/Description';
import { BASE_API } from '../config/env.js';


function StoreDescriptionInDb(){

    const router = express.Router();
    
    // Fetch description by subjectId
    router.post('/description/store/:subjectId', async (req, res) => {
        const { subjectId } = req.params;
        
        try{
            const dataFromApi= await axios.get(`${BASE_API}/info/${subjectId}`);
            const descriptionData = dataFromApi.data?.results?.subject;
            
            let existingDescription = await DescriptionModel.find({subjectId:{$in: subjectId}}).distinct("subjectId");
            
            let newDescription = descriptionData.filter(description => !existingDescription.includes(description.subjectId));
            
            if (newDescription.length === 0){
                console.log("All movies are already cached")
                return res.json({message:"Movies have already been cached",added:0})
            }
            
            await DescriptionModel.insertMany(newDescription,{ordered:false});
            
            res.json({
                message:`Cached ${newDescription.length} movies`,
                totalFetched: descriptionData.length,
                totalExisting: existingDescription.length,
                totalCached: newDescription.length
            })
            
}catch(error){
    console.error("Unable to cache data to database",error);
    res.status(500).json({message:"Internal Server Error"});
    
}
})
} export default StoreDescriptionInDb;




