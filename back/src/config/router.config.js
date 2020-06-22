import { Router } from 'express';

import { checkIfCredentialsExist, encryptPassword } from '../middleware/credentials.middleware';
import { registerUser, loginUser } from '../controllers/Auth.controller';

const router = Router();
const URL_CONSTANT = {
  USER: 'user',
  BOOK: 'book',
};

// Auth
router.post(`/${URL_CONSTANT.USER}/register`, [checkIfCredentialsExist, encryptPassword], registerUser);
router.post(`/${URL_CONSTANT.USER}/login`, loginUser);

// User
router.get(`/${URL_CONSTANT.USER}`);
router.post(`/${URL_CONSTANT.USER}`);
router.put(`/${URL_CONSTANT.USER}`);
router.delete(`/${URL_CONSTANT.USER}`);

export default router;
