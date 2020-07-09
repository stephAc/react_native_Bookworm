import Book from '../models/Book.model';
import Comment from '../models/Comment.model';

export default class CommentService {
  static async create(user, { rating, opinion }) {
    return await Comment.create({ author: user, rating, opinion });
  }

  static async find(bookId) {
    return await Book.findById(bookId).populate({
      path: 'comment',
      populate: {
        path: 'author',
        model: 'User',
        select: 'username image'
      }
    });
  }
}