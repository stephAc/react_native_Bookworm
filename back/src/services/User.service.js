import User from '../models/User.model';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const addUser = async (user) => {
    return await User.create(user);
};

const generateUserToken = async (id) => {
    return jwt.sign({ id }, 'NotASecretKey');
};

const findByCredentials = async ({ username, email, password }) => {
    const user = username && await User.findOne({ username }) || email && await User.findOne({ email });
    if (!user) throw new Error('Invalid login credentials');
    const doPasswordMatch = await bcrypt.compare(password, user.password);
    if (!doPasswordMatch) throw new Error('Invalid login credentials');
    return user;
};

export {
    addUser,
    generateUserToken,
    findByCredentials,
};