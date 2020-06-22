import Book from '../models/Book.model';

export default class BookService {
  static async find() {}

  static async findOneById(id) {}

  static async deleteById(id) {
    return await User.findByIdAndDelete(id);
  }
}
