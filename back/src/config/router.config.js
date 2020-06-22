import { Router } from 'express';

import UserController from '../controllers/User.controller';
import {
  checkIfCredentialsExist,
  encryptPassword,
} from '../middleware/credentials.middleware';
import multerHandle from '../middleware/multer.middleware';
import { registerUser, loginUser } from '../controllers/Auth.controller';

const router = Router();
const URL_CONSTANT = {
  USER: 'user',
  BOOK: 'book',
};

// Auth
router.post(
  `/${URL_CONSTANT.USER}/register`,
  [multerHandle, checkIfCredentialsExist, encryptPassword],
  registerUser,
);
router.post(`/${URL_CONSTANT.USER}/login`, loginUser);

// User
router.get(`/${URL_CONSTANT.USER}`, UserController.get);
router.get(`/${URL_CONSTANT.USER}/:id`, UserController.getById);
router.put(
  `/${URL_CONSTANT.USER}/:id`,
  [multerHandle, checkIfCredentialsExist],
  UserController.updateById,
);
router.delete(`/${URL_CONSTANT.USER}/:id`, UserController.deleteById);

export default router;
