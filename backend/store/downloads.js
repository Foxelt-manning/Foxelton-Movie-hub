import express from 'express';
import axios from 'axios';
import DownloadModel from '../models/Downloads.js';
import { BASE_API } from '../config/env.js';
import OverallInfo from '../models/Overall.js';



const router = express.Router(); 
function StoreDownloadIntoDB(seasons,episode){

    // Fetch download by subjectId
    router.post('/download/store/:subjectId', async (req, res) => {
        const { subjectId } = req.params;
        let dataFromApi = null;
        
        try{
            // for MOVIES
            if (seasons < 1){
                dataFromApi = await axios.get(`${BASE_API}/sources/${subjectId}`);
            }

            dataFromApi = await axios.get(`${BASE_API}/sources/${subjectId}?season=${seasons}&episode=${episode}`);
            const downloadData = dataFromApi.data?.results || [];
            
            const ids = downloadData.map(d => d.id);
            let existingDownloads = [];
            if (ids.length > 0) {
                existingDownloads = await DownloadModel.find({ id: { $in: ids } }).distinct("id");
            }
            
            let newdownloads = downloadData.filter(downloads => !existingDownloads.includes(downloads.id));
            
            if (newdownloads.length === 0){
                console.log("All downloads are already cached")
                return res.json({message:"Movies have already been cached",added:0})
            }
            
            await DownloadModel.insertMany(newdownloads,{ordered:false});
            
            res.json({
                message:`Cached ${newdownloads.length} movies`,
                totalFetched: downloadData.length,
                totalExisting: existingDownloads.length,
                totalCached: newdownloads.length
    })
    
}catch(error){
    console.error("Unable to cache data to database",error);
    res.status(500).json({message:"Internal Server Error"});
    
}
})
}export default StoreDownloadIntoDB;
