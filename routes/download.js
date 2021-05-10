import express from 'express';
import download from '../controllers/download.js';
const router = express.Router();


router.get('/:uuid', download);


export default router;