import axios from 'axios';
import DescriptionModel from '../models/Description';
import { BASE_API } from '../config/env.js';


export async function StoreDescriptionInDb(subjectId){


        
            const dataFromApi= await axios.get(`${BASE_API}/info/${subjectId}`);
            const descriptionData = dataFromApi.data?.results?.subject;
            
            let existingDescription = await DescriptionModel.find({subjectId:{$in: descriptionData.map(m=>m.subjectId)}}).distinct("subjectId");
            
            let newDescription = descriptionData.filter(description => !existingDescription.includes(description.subjectId));
            
            if (newDescription.length === 0){
                console.log("All movies are already cached")
                await DescriptionModel.insertMany(newDescription,{ordered:false});
            }

             return newDescription.length === 0 ? newDescription:descriptionData
            
            
            

}




