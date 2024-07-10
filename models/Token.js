import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 3600 },
});

const Token = mongoose.model('Token', TokenSchema);
export default Token;
