import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Token from '../models/Token.js';
import config from '../config/config.js';

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, config.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = async (user) => {
    const refreshToken = jwt.sign({ id: user._id, email: user.email }, config.REFRESH_TOKEN_SECRET);
    const token = new Token({ userId: user._id, token: refreshToken });
    await token.save();
    return refreshToken;
};

const signup = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return user;
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    return { accessToken, refreshToken };
};

export { signup, login, generateAccessToken, generateRefreshToken };

