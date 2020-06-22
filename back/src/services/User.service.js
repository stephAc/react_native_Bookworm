import User from '../models/User.model';

export default class UserService {
  static async find() {
    return await User.find({}, '-password').populate('book');
  }

  static async findOneById(id) {
    return await User.findById(id, '-password');
  }

  static async findOneByEmail(email) {
    return await User.findById({ email }, '-password');
  }

  static async updateById(id, update) {
    return await User.findByIdAndUpdate({ _id: id }, update, {
      new: true,
      useFindAndModify: false,
      upsert: true,
    })
      .select('-password')
      .populate('book');
  }

  static async updateByFilter(filter, update) {
    return await User.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: false,
      upsert: true,
    })
      .select('-password')
      .populate('book');
  }

  static async deleteById(id) {
    return await User.findByIdAndDelete(id);
  }
}
