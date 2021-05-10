import express from 'express'
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import {notFound, errorHandler } from './middleware/errorMiddleware.js';

import filesRouter from './routes/files.js';
import downloadRouter from './routes/download.js';
import showRouter from './routes/show.js';

dotenv.config();
connectDB();

// Cors 
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(',')
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}

const PORT = process.env.PORT || 3000;
const app = express();

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

app.use(cors(corsOptions))
app.use(express.static('public'));

app.use(express.json());

const __dirname = path.resolve();
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes 
app.use('/api/files', filesRouter);
app.use('/files', showRouter);
app.use('/files/download', downloadRouter);

// error Handler
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, console.log(`Listening on port ${PORT}.`));