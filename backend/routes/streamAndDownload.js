import express, { Router } from 'express';
import Movie from '../models/Movies.js';
import StoreDownloadIntoD from '../store/downloads.js';
import DownloadModel from '../models/Downloads.js';

 const router = express.Router();


    router.get(`/stream-download/:subjectId`, async (req,res)=>{
        const {subjectId} = req.params;
        const {season,episode} = req.query;

        try {
            const cachedDownloadLinks = await DownloadModel.find({
                subjectId:subjectId
            }); 

            if (cachedDownloadLinks.length > 0){
                return res.json({message:"success",downloads:cachedDownloadLinks})
            }
            const newDownloadLinks = await StoreDownloadIntoD(season,episode,subjectId);
            res.json({message:"cached download links successfully",downloads:newDownloadLinks})
           
        } catch (error) {
            console.error("Error fetching stream and download Api",error);
        }
}); export default router;