import {config} from 'dotenv';
import process from 'process';

config({path :`.env.local`});

export const{
    PORT,
    MONGODB_URI,
    BASE_API,
} = process.env;