import httpStatus from 'http-status-codes';

import UserService, {
  addUser,
  generateUserToken,
  findByCredentials,
} from '../services/User.service';

const registerUser = async (req, res) => {
  if (req.file) req.body.image = req.file.path;

  try {
    let user = await addUser(req.body);
    const session_token = await generateUserToken(user._id);
    user = await UserService.updateById(user._id, { session_token });
    res.status(httpStatus.CREATED).json({ session_token });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    let user = await findByCredentials(req.body);
    if (!user)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'User not found' });
    const session_token = await generateUserToken(user._id);
    user = await UserService.updateById(user._id, { session_token });
    res.status(httpStatus.OK).json({ session_token });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export { registerUser, loginUser };
