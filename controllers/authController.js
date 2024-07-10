import { signup, login, generateAccessToken, generateRefreshToken } from '../services/authServices.js';
import jwt from 'jsonwebtoken';
import Token from '../models/Token.js';

const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await signup(username, email, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken } = await login(email, password);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag in production
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const refreshTokenController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(403);

    try {
        const tokenDoc = await Token.findOne({ token: refreshToken });
        if (!tokenDoc) return res.sendStatus(403);

        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = generateAccessToken({ id: payload.id, email: payload.email });
        res.json({ accessToken });
    } catch (error) {
        res.sendStatus(403);
    }
};

const logoutController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        await Token.findOneAndDelete({ token: refreshToken });
        res.clearCookie('refreshToken');
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { signupController, loginController, refreshTokenController, logoutController };
