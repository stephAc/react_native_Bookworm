import User from '../models/User.model';
import Book from '../models/Book.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class UserService {
  static async find() {
    return await User.find({}, '-password').populate('book');
  }

  static async findOneById(id) {
    return await User.findById(id, '-password').populate('book');
  }

  static async findOneByEmail(email) {
    return await User.findById({ email }, '-password');
  }

  static async updateById(id, update) {
    return await User.findByIdAndUpdate(id, update, {
      new: true,
      useFindAndModify: false,
      upsert: false,
    })
      .select('-password')
      .populate('book');
  }

  static async updateByFilter(filter, update) {
    return await User.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: false,
      upsert: false,
    })
      .select('-password')
      .populate('book');
  }

  static async deleteById(id) {
    return await User.findByIdAndDelete(id);
  }
}

const addUser = async (user) => {
  return await User.create(user);
};

const generateUserToken = async (id) => {
  return jwt.sign({ id }, 'NotASecretKey');
};

const findByCredentials = async ({ username, email, password }) => {
  const user =
    (username && (await User.findOne({ username }))) ||
    (email && (await User.findOne({ email })));
  if (!user) throw new Error('Invalid login credentials');
  const doPasswordMatch = await bcrypt.compare(password, user.password);
  if (!doPasswordMatch) throw new Error('Invalid login credentials');
  return user;
};

export { addUser, generateUserToken, findByCredentials };
