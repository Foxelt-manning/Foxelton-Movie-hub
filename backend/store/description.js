import axios from 'axios';
import DescriptionModel from '../models/Description.js';
import { BASE_API } from '../config/env.js';



export  default async function StoreDescriptionInDb(subjectId){


        const response = await axios.get(`${BASE_API}info/${subjectId}`);
        // Try multiple possible payload shapes to be defensive
        const FullData = response.data?.data || response.data || {};
        // API may return subject under different keys; try common ones
        const descriptionData = FullData?.subject || FullData?.item || FullData || null;
        console.log("Full fetch:", FullData);
        console.log("Description Data from API: ", descriptionData);

        if (!descriptionData || Object.keys(descriptionData).length === 0){
            // don't throw — return null and let caller decide how to handle missing data
            console.warn(`No description data returned for subjectId=${subjectId}`);
            return null;
        }
            
            let existingDescription = await DescriptionModel.findOne({
                subjectId: descriptionData.subjectId || subjectId
            });

            if (existingDescription){
                console.log("All movies are already cached")
                return existingDescription;
            }else{
                                    const descriptionToSave = {
                                        subjectId: descriptionData.subjectId || subjectId,
                                        title: descriptionData.title || descriptionData.name || '',
                                        genre: (descriptionData.genre && typeof descriptionData.genre === 'string') ? descriptionData.genre.split(',') : (descriptionData.genres || []),
                                        releaseDate: descriptionData.releaseDate || descriptionData.release_date || '',
                                        rating: descriptionData.rating || {},
                                        metadata: FullData.metadata || FullData || {},
                                        trailer: descriptionData.trailer || {},
                                        stars: FullData.stars || FullData.cast || [], 
                                        seasons: (FullData.resource && FullData.resource.seasons) ? FullData.resource.seasons : (FullData.seasons || []),
                                        imdbRatingValue: descriptionData.imdbRatingValue || descriptionData.imdb_rating || '',
                                        duration: descriptionData.duration || descriptionData.runtime || 0,
                                        countryName: descriptionData.countryName || descriptionData.country || '',
                                        cachedAt: new Date()
                };
                 const savedDescription= await DescriptionModel.create(descriptionToSave);
                 console.log(savedDescription)
                 return savedDescription;
             }

}




