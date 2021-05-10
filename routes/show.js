import express from 'express';
const router = express.Router();
import show from '../controllers/show.js';

router.get('/:uuid', show);


export default router;