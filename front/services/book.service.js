import axios from 'axios';

import { MAIN_API_URL, BOOK, COMMENT } from '../config/url.config';

export default class BookService {
  static addToLibrary = async (token, userId, book) => {
    return await axios({
      method: 'PUT',
      url: `${MAIN_API_URL}${BOOK}${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: book,
    });
  }

  static removeFromLibrary = async (token, userId, bookId) => {
    return await axios({
      method: 'PUT',
      url: `${MAIN_API_URL}${BOOK}${userId}/${bookId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static publishComment = async (token, userId, bookId, rating, opinion) => {
    return await axios({
      method: 'POST',
      url: `${MAIN_API_URL}${COMMENT}${userId}/${bookId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        rating,
        opinion
      },
    });
  }

  static fetchComments = async (bookId) => {
    return await axios({
      method: 'GET',
      url: `${MAIN_API_URL}${COMMENT}${bookId}`
    });
  }
}