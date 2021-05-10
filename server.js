import express from 'express'
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import {notFound, errorHandler } from './middleware/errorMiddleware.js';

import filesRouter from './routes/files.js';
import downloadRouter from './routes/download.js';
import showRouter from './routes/show.js';
import indexRouter from './routes/index.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;
const app = express();


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,"public")));

app.use(express.json());


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes 
app.use('/',indexRouter);
app.use('/api/files', filesRouter);
app.use('/files', showRouter);
app.use('/files/download', downloadRouter);

// error Handler
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, console.log(`Listening on port ${PORT}.`));