import httpStatus from 'http-status-codes';

import UserService from '../services/User.service';
export default class UserController {
  static async get(request, response) {
    let status = httpStatus.OK;
    let body = {};

    try {
      const userList = await UserService.find();
      body = { data: userList, message: 'Users list' };
    } catch (err) {
      status = httpStatus.INTERNAL_SERVER_ERROR;
      body = { message: 'Internal issue' };
    }

    response.status(status).json(body);
  }

  static async getById(request, response) {
    let status = httpStatus.OK;
    let body = {};
    const id = request.params.id;

    try {
      const user = await UserService.findOneById(id);
      if (!user) {
        status = httpStatus.NOT_FOUND;
        throw { message: 'No user finded with this id' };
      }
    } catch (err) {
      if (status === httpStatus.OK) status = httpStatus.INTERNAL_SERVER_ERROR;
      body = { message: err.message || 'Internal issue' };
    }
    response.status(status).json(body);
  }

  static async updateById(request, response) {
    let status = httpStatus.OK;
    let body = {};
    const id = request.params.id;

    try {
      let user = UserService.updateById(id);
      body = { data: user, message: 'User updated' };
    } catch (err) {}
    response.status(status).json(body);
  }

  static async deleteById(request, response) {
    let status = httpStatus.OK;
    let body = {};
    const id = request.params.id;

    try {
      let user = UserService.deleteById(id);
      body = { message: 'User deleted' };
    } catch (err) {}
    response.status(status).json(body);
  }
}
