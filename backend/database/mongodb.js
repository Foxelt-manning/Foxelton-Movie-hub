
import mongoose from 'mongoose';
import process from 'process';

import { MONGODB_URI } from '../config/env.js';
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const databaseConnect = async()=>{
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to database successfully");
    }
    catch (error) {
        console.error('Error connecting to database: ', error);
        process.exit(1);
    }
}
export default databaseConnect;