import { Router } from 'express';

import { registerUser } from '../controllers/Auth.controller';
import { encryptPassword } from '../middleware/credentials.middleware';

const router = Router();
const URL_CONSTANT = {
  USER: 'user',
  BOOK: 'book',
};

// Auth
router.post(`/${URL_CONSTANT.USER}/register`, encryptPassword, registerUser);
router.post(`/${URL_CONSTANT.USER}/login`);

// User
router.get(`/${URL_CONSTANT.USER}`);
router.post(`/${URL_CONSTANT.USER}`);
router.put(`/${URL_CONSTANT.USER}`);
router.delete(`/${URL_CONSTANT.USER}`);

export default router;
