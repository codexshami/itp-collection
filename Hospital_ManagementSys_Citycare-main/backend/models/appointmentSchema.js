import mongoose from "mongoose";
import validator from "validator";


const appointmentSchema = new mongoose.Schema({
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
    ano: {
        type: String,
        required: true,
        minLength: [12, "Aadhar number should be of 12 digits!!"],
        maxLength: [12, "Aadhar number should be of 12 digits!!"]
    },
    dob: {
        type: Date,
        required: [true, "DOB is requierd!!"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    appointment_date: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    doctor: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    hasVisited: {
        type: Boolean,
        default: false
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected", "Done"],
        default: "Pending"
    }
});


export const Appointment = mongoose.model("Appointment", appointmentSchema)
