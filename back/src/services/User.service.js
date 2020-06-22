import User from '../models/User.model';

import jwt from 'jsonwebtoken';

const addUser = async (user) => {
    return await User.create(user);
}

const generateUserToken = async (id) => {
    return jwt.sign({ id }, 'NotASecretKey');
}

export {
    addUser,
    generateUserToken
};