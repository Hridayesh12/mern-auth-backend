import mongoose, { Schema } from 'mongoose';

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
    },
    timeline: {

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String, //cloudinary url
        required: true,
    },
    bank_details: {
        type: Schema.Types.ObjectId,
        ref: "BankDetails"
    }
}
    , { timestamps: true });

export const Event = mongoose.model("Event", eventSchema);