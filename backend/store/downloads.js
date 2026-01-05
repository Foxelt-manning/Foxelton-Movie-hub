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
            const downloadData = dataFromApi.data?.data|| [];
            let existingDownload = await DownloadModel.findOne({subjectId:subjectId});

            if (existingDownload){
                console.log("Streaming and Download Data already Cached")
                return existingDownload;
            }
            else{
                const Stream_DownloadDataSave ={
                    subjectId:subjectId,
                    captions:downloadData.captions,
                    downloads:downloadData.downloads,
                    stream:downloadData.processedSources,
                    cachedAt: new Date()
                };
                 const savedDescription= await DownloadModel.create(Stream_DownloadDataSave);
                                 console.log(savedDescription)
                                 return savedDescription;
                             
            }
            
            
           
            
            
            
    
}export default StoreDownloadIntoDB;
