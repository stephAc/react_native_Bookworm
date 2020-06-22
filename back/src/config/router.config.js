import { Router } from 'express';

import UserController from '../controllers/User.controller';

const router = Router();
const URL_CONSTANT = {
  USER: 'user',
  BOOK: 'book',
};

// Auth
router.post(`/${URL_CONSTANT.USER}/register`);
router.post(`/${URL_CONSTANT.USER}/login`);

// User
router.get(`/${URL_CONSTANT.USER}`, UserController.get);
router.get(`/${URL_CONSTANT.USER}/:id`, UserController.getById);
router.put(`/${URL_CONSTANT.USER}/:id`, UserController.updateById);
router.delete(`/${URL_CONSTANT.USER}/:id`, UserController.deleteById);

export default router;
