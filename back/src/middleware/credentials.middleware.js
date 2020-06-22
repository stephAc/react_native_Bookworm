import httpStatus from 'http-status-codes';

import User from '../models/User.model';

import bcrypt from 'bcrypt';

const checkIfCredentialsExist = async (req, res, next) => {
    const { username, email } = req.body;
    if (await User.exists({ username })) return res.status(httpStatus.BAD_REQUEST).json({ message: 'Username already taken' });
    if (await User.exists({ email })) return res.status(httpStatus.BAD_REQUEST).json({ message: 'Email already used' });
    next();
};

const encryptPassword = async (req, res, next) => {
    const { password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);
    next();
};

export {
    checkIfCredentialsExist,
    encryptPassword,
};