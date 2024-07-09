import User from '../models/User.js';

// Sample service method
const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// Other service methods for signup, login, etc.

export { getUserByEmail };
