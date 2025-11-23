import {config} from 'dotenv';
import process from 'process';
if(process.env.NODE_ENV !== "production"){
    config({path :`.env.local`});
}

export const{
    PORT,
    MONGODB_URI,
    BASE_API,
} = process.env;