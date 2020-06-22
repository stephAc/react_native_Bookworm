import User from '../models/User.model';

import { addUser, generateUserToken } from '../services/User.service';

const registerUser = async (req, res, next) => {
    try {
        const user = await addUser(req.body);

        const token = await generateUserToken(user._id);

        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export {
    registerUser
}