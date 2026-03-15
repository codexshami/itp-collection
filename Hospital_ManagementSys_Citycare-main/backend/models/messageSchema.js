import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name should be at least 3 characters!!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name should be at least 3 characters!!"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number should be of 10 digits!!"],
        maxLength: [10, "Phone number should be of 10 digits!!"]
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "Message must contain at least 10 Characters!!"]
    }
});

export const Message = mongoose.model("Message", messageSchema);
