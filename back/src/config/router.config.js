import { Router } from 'express';

import {
  checkIfCredentialsExist,
  encryptPassword,
  decryptToken,
} from '../middleware/credentials.middleware';
import multerHandle from '../middleware/multer.middleware';
import { registerUser, loginUser } from '../controllers/Auth.controller';
import UserController from '../controllers/User.controller';
import { search } from '../controllers/Google.controller';
import BookController from '../controllers/Book.controller';
import CommentController from '../controllers/Comment.controller';

const router = Router();
const URL_CONSTANT = {
  USER: 'user',
  BOOK: 'book',
  COMMENT: 'comment',
};

// Auth
router.post(
  `/${URL_CONSTANT.USER}/register`,
  [multerHandle, checkIfCredentialsExist, encryptPassword],
  registerUser,
);
router.post(`/${URL_CONSTANT.USER}/login`, loginUser);

// User
router.get(`/${URL_CONSTANT.USER}`, decryptToken, UserController.get);
router.get(`/${URL_CONSTANT.USER}/list`, UserController.list);
router.get(`/${URL_CONSTANT.USER}/:id`, decryptToken, UserController.getById);
router.put(
  `/${URL_CONSTANT.USER}/update/:id`,
  [multerHandle, decryptToken],
  UserController.updateById,
);
router.delete(`/${URL_CONSTANT.USER}/:id`, decryptToken, UserController.delete);

// Book
router.get(`/${URL_CONSTANT.BOOK}/search`, search);
router.get(`/${URL_CONSTANT.BOOK}/list`, BookController.list);
router.put(
  `/${URL_CONSTANT.BOOK}/:userId`,
  decryptToken,
  BookController.updateLibrary,
);
router.put(
  `/${URL_CONSTANT.BOOK}/:userId/:bookId`,
  decryptToken,
  BookController.updateLibrary,
);

//Comment
router.post(`/${URL_CONSTANT.COMMENT}/:userId/:bookId`, decryptToken, CommentController.add);
router.get(`/${URL_CONSTANT.COMMENT}/:bookId`, CommentController.list);

//Comment
router.post(`/${URL_CONSTANT.COMMENT}/:userId/:bookId`, decryptToken, CommentController.add);
router.get(`/${URL_CONSTANT.COMMENT}/:bookId`, CommentController.list);

export default router;
