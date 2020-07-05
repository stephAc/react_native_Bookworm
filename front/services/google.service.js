import axios from 'axios';

// import { API_URL_DEV } from '../config/url.config';

export default class GoogleService {
    static search = async (text, maxResults) => {
        return await axios({
            method: 'GET',
            url: `http://localhost:4000/book/search?q=${text}&maxResults=${maxResults}&orderBy=relevance`
        });
    };

    static searchByISBN = async (isbn) => {
        return await axios({
            method: 'GET',
            url: `http://localhost:4000/book/search?q=isbn:${isbn}`
        });
    };

    static searchByTitle = async (title, maxResults) => {
        return await axios({
            method: 'GET',
            url: `http://localhost:4000/book/search?q=intitle:${title}&maxResults=${maxResults}&orderBy=relevance`
        });
    };

    static searchByAuthor = async (author, maxResults) => {
        return await axios({
            method: 'GET',
            url: `http://localhost:4000/book/search?q=inauthor:${author}&maxResults=${maxResults}&orderBy=relevance`
        });
    };
}