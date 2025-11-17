import axios from 'axios';
import DescriptionModel from '../models/Description.js';
import { BASE_API } from '../config/env.js';



export  default async function StoreDescriptionInDb(subjectId){


        const response= await axios.get(`${BASE_API}info/${subjectId}`);
        const descriptionData = response.data?.results?.subject;
         const FullData = response.data?.results;
        console.log("Full fetch:", FullData);
            console.log("Description Data from API: ", descriptionData);
            
            if (!descriptionData){
                throw new Error("No description data found from API");
            }
            
            let existingDescription = await DescriptionModel.findOne({
                subjectId:descriptionData.subjectId
            });

            if (existingDescription){
                console.log("All movies are already cached")
                return existingDescription;
            }else{
                  const descriptionToSave = {
                    subjectId: descriptionData.subjectId,
                    title: descriptionData.title,
                    genres:descriptionData.genre || [],
                    releaseDate: descriptionData.releaseDate || '',
                    rating: descriptionData.rating || {},
                    metadata: FullData.metadata || {},
                    trailer: descriptionData.trailer || {},
                    stars:FullData.stars || [], 
                    seasons: FullData.resource.seasons || [],
                    imdbRatingValue: descriptionData.imdbRatingValue || '',
                    duration: descriptionData.duration,
                    countryName:descriptionData.countryName,
            cachedAt: new Date()
        };
                 await DescriptionModel.create(descriptionToSave);
             }

            return descriptionData;


}




