import httpStatus from 'http-status-codes';

import {
  addUser,
  generateUserToken,
  findByCredentials,
} from '../services/User.service';

const registerUser = async (req, res) => {
  try {
    const user = await addUser(req.body);
    const token = await generateUserToken(user._id);
    res.status(httpStatus.CREATED).json({ token });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await findByCredentials(req.body);
    if (!user)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'User not found' });
    const token = await generateUserToken(user._id);
    res.status(httpStatus.OK).json({ token });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export { registerUser, loginUser };
