import axios from 'axios';

import { MAIN_API_URL, BOOK } from '../config/url.config';

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
}