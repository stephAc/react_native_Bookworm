import httpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/User.model';
import UserService from '../services/User.service';

const checkIfCredentialsExist = async (req, res, next) => {
  const { username, email } = req.body;
  if (await User.exists({ username }))
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: 'Username already taken' });
  if (await User.exists({ email }))
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: 'Email already used' });
  next();
};

const encryptPassword = async (req, res, next) => {
  const { password } = req.body;
  req.body.password = await bcrypt.hash(password, 10);
  next();
};

const decryptToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace(/Bearer /g, '');
    console.log('token', token);
    const userID = jwt.verify(token, 'NotASecretKey');
    console.log(userID);
    const user = await UserService.findOneById(userID.id);
    if (user.session_token !== token) {
      throw { message: 'Unauthorized: token difference' };
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(httpStatus.UNAUTHORIZED).json(err.message);
  }
};

export { checkIfCredentialsExist, encryptPassword, decryptToken };
