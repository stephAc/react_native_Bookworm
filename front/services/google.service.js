import axios from 'axios';

import { MAIN_API_URL, BOOK } from '../config/url.config';

export default class GoogleService {
    static get = async (google_link) => {
        return await axios({
            method: 'GET',
            url: google_link
        });
    };

    static search = async (text, maxResults) => {
        return await axios({
            method: 'GET',
            url: `${MAIN_API_URL}${BOOK}search?q=${text}&maxResults=${maxResults}&orderBy=relevance`
        });
    };

    static searchByISBN = async (isbn) => {
        return await axios({
            method: 'GET',
            url: `${MAIN_API_URL}${BOOK}search?q=isbn:${isbn}`
        });
    };

    static searchByTitle = async (title, maxResults) => {
        return await axios({
            method: 'GET',
            url: `${MAIN_API_URL}${BOOK}search?q=intitle:${title}&maxResults=${maxResults}&orderBy=relevance`
        });
    };

    static searchByAuthor = async (author, maxResults) => {
        return await axios({
            method: 'GET',
            url: `${MAIN_API_URL}${BOOK}search?q=inauthor:${author}&maxResults=${maxResults}&orderBy=relevance`
        });
    };
}