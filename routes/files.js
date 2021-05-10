import express from 'express';
import { root, send } from '../controllers/files.js';
const router = express.Router();

router.post('/', root);

router.post('/send', send);

export default router;