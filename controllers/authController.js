import { getUserByEmail } from '../services/authServices.js';

// @route   GET api/auth
// @desc    Test route
// @access  Public
const testAuth = (req, res) => {
    res.send('Auth route');
};

// Other controller methods for signup, login, etc.

export default { testAuth };
