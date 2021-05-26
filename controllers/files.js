import multer from 'multer';
import path from 'path';
import File from '../models/file.js';
import {v4 as uuidv4} from 'uuid';
import asyncHandler from 'express-async-handler';
import sendMail from '../services/mailService.js';
import emailTemplate from '../services/emailTemplate.js'



let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/') ,
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
              cb(null, uniqueName)
    } ,
});

let upload = multer({ storage, limits:{ fileSize: 1000000 * 100 }, }).single('myfile'); //100mb

const root =  (req, res) => {
    upload(req, res, asyncHandler(async (err) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
        const file = new File({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        });
        const response = await file.save();
        res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
      }));
};

const send = asyncHandler(async (req, res) => {
    const { uuid, emailTo, emailFrom, expiresIn } = req.body;
    if(!uuid || !emailTo || !emailFrom) {
        return res.status(422).send({ error: 'All fields are required except expiry.'});
    }
    // Get data from db 
      const file = await File.findOne({ uuid: uuid });
      if(file.sender) {
        return res.status(422).send({ error: 'Email already sent once.'});
      }
      file.sender = emailFrom;
      file.receiver = emailTo;
      const response = await file.save();

      if(!response){
        res.status(400)
        throw new Error('Invalid user data');
      }
      // send mail
     const sending = sendMail({
        from: emailFrom,
        to: emailTo,
        subject: 'File-Share file sharing',
        text: `${emailFrom} shared a file with you.`,
        html: emailTemplate({
                  emailFrom, 
                  downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}?source=email` ,
                  size: parseInt(file.size/1000) + ' KB',
                  expires: '24 hours'
              })
      })
      if(!sending){
        res.status(404);
        throw new Error('Mail not send');
      }
      return res.json({success: true});
  
  });

export { root, send };