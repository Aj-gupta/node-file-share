import File from '../models/file.js';
import asyncHandler from 'express-async-handler';
import path from 'path';

const __dirname = path.resolve();
const download = asyncHandler(async (req, res) => {
    // Extract link and get file from storage send download stream 
    const file = await File.findOne({ uuid: req.params.uuid });
    // Link expired
    if(!file) {
         return res.render('download', { error: 'Link has been expired.'});
    } 
    const response = await file.save();
    const filePath = `${__dirname}/../${file.path}`;
//     console.log(filePath);
    res.download(filePath);
 });

 export default download;