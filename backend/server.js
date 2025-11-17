import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import databaseConnect from './database/mongodb.js';

import HomeApi from './routes/movies.js';
import MovieListApi from './routes/movieList.js';
import MovieDetailsApi from './routes/movieDetails.js';
import streamandDownloadApi from './routes/streamAndDownload.js';
import TrendingApi from './routes/trending.js';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api', HomeApi);
app.use('/api', MovieListApi);
app.use('/api', MovieDetailsApi);
app.use('/api', streamandDownloadApi);
app.use('/api', TrendingApi);


app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await databaseConnect();
});  
