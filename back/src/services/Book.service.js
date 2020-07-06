import Book from '../models/Book.model';
import User from '../models/User.model';

export default class BookService {
  static async find() {
    return await Book.find();
  }

  static async create(book) {
    return await Book.create(book);
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
}