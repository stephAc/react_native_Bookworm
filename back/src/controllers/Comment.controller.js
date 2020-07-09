import httpStatus from 'http-status-codes';

import UserService from '../services/User.service';
import CommentService from '../services/Comment.service';
import BookService from '../services/Book.service';

export default class CommentController {
  static async list(request, response) {
    const { bookId } = request.params;
    try {
      const book = await CommentService.find(bookId);
      response.status(httpStatus.OK).json(book.comment);
    } catch (error) {
      response.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  static async add(request, response) {
    const { userId, bookId } = request.params;
    try {
      const user = await UserService.findOneById(userId);
      const comment = await CommentService.create(user, request.body);
      const book = await BookService.addComment(bookId, comment);
      response.status(httpStatus.CREATED).json(book);
    } catch (error) {
      response.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}
