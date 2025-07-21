import express from 'express';
import { generateKeypair } from '../controllers/vanityController.js';

const router = express.Router();
router.post('/', generateKeypair);

export default router;
