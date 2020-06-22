import axios from 'axios';

import { url } from '../config/url.config';

export default class GoogleService {
    static async search({ q, maxResults, orderBy }) {
        let url_query = `${url.GOOGLE_API_URL}/volumes?q=${q.replace(' ', '+')}`;
        if (maxResults) url_query = `${url_query}&maxResults=${maxResults}`;
        if (orderBy) url_query = `${url_query}&orderBy=${orderBy}`;

        return await axios({
            method: 'GET',
            url: url_query
        });
    };
}