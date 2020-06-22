import bcrypt from 'bcrypt';

const encryptPassword = async (req, res, next) => {
    const { password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);
    next();
}

export {
    encryptPassword
}