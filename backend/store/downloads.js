import axios from 'axios';
import DownloadModel from '../models/Downloads.js';
import { BASE_API } from '../config/env.js';



export async function StoreDownloadIntoDB(seasons,episode,subjectId){

    // Fetch download by subjectId
    let dataFromApi= null;
            if (seasons < 1){
                dataFromApi = await axios.get(`${BASE_API}sources/${subjectId}`);
            }
            else{
                dataFromApi = await axios.get(`${BASE_API}sources/${subjectId}?season=${seasons}&episode=${episode}`);
            }
            const downloadData = dataFromApi.data?.results || [];
            
            const ids = downloadData.map(d => d.id);
            let existingDownloads = [];
            if (ids.length > 0) {
                existingDownloads = await DownloadModel.find({ id: { $in: ids } }).distinct("id");
            }
            
            let newdownloads = downloadData.filter(downloads => !existingDownloads.includes(downloads.id));
            
            if (newdownloads.length > 0){
                console.log("All downloads are already cached")
                await DownloadModel.insertMany(newdownloads,{ordered:false}); 
            }
            return newdownloads.length === 0 ? newdownloads:downloadData;
            
            
            
    
}export default StoreDownloadIntoDB;
