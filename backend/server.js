import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import databaseConnect from './database/mongodb.js';

const app = express();
app.use(cors());

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await databaseConnect();
});
