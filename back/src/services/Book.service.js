import Book from '../models/Book.model';
import User from '../models/User.model';

export default class BookService {
  static async create(book) {
    return await Book.create(book);
  }

  static async find() {
    return await Book.find();
  }

  static async getByLink(google_link) {
    return await Book.findOne({ google_link });
  }

  static async deleteById(id) {
    return await Book.findByIdAndDelete(id);
  }

  static async addToLibrary(userId, book) {
    return await User.updateOne(
      { _id: userId },
      { $push: { book } }
    );
  }

  static async removeFromLibrary(userId, bookId) {
    return await User.updateOne(
      { _id: userId },
      { $pull: { book: bookId } }
    );
  }

  static async addComment(bookId, comment) {
    return await Book.updateOne(
      { _id: bookId },
      { $push: { comment } }
    );
  }
}