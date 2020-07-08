import axios from 'axios';

import { MAIN_API_URL, USER } from '../config/url.config';

export default class UserService {
  static async create(data) {
    const config = {
      method: 'post',
      url: `${MAIN_API_URL}${USER}register`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };
    return await axios(config);
  }
  static async login(data) {
    const config = {
      method: 'post',
      url: `${MAIN_API_URL}${USER}login`,
      data,
    };
    return await axios(config);
  }
  static async get(token) {
    const config = {
      method: 'get',
      url: `${MAIN_API_URL}${USER}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  }
  static async update(id, token, data) {
    const config = {
      method: 'put',
      url: `${MAIN_API_URL}${USER}update/${id}`,
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Methods': 'POST, GET, PUT',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data,
    };
    return await axios(config);
  }
  static async delete(id, token) {
    const config = {
      method: 'delete',
      url: `${MAIN_API_URL}${USER}${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  }
}
