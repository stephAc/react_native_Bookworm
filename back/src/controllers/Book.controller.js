import httpStatus from 'http-status-codes';

import BookService from '../services/Book.service';

export default class BookController {
  static async list(request, response) {
    try {
      const books = await BookService.find();
      response.status(httpStatus.OK).json(books);
    } catch (error) {
      response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  static async create(request, response) {
    try {
      const book = await BookService.create(request.body);
      response.status(httpStatus.CREATED).json(book);
    } catch (error) {
      response.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  static async updateLibrary(request, response) {
    const { userId, bookId } = request.params;
    try {
      let user;
      if (!bookId) {
        const book = await BookService.create(request.body);
        user = await BookService.addToLibrary(userId, book);
        if (!user)
          response.status(httpStatus.NOT_FOUND).json({ message: 'Failed to add to library' });
      } else {
        const book = await BookService.deleteById(bookId);
        if (!book)
          response.status(httpStatus.NOT_FOUND).json({ message: 'Book could not be deleted' });
        user = await BookService.removeFromLibrary(userId, bookId)
        if (!user)
          response.status(httpStatus.NOT_FOUND).json({ message: 'Failed to remove from library' });
      }
      response.status(httpStatus.OK).json(user);
    } catch (error) {
      response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}