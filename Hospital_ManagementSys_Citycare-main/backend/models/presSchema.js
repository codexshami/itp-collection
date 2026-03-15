import mongoose from "mongoose";


const presSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number should be of 10 digits!!"],
        maxLength: [10, "Phone number should be of 10 digits!!"]
    },
    ano: {
        type: String,
        required: true,
        minLength: [12, "Aadhar number should be of 10 digits!!"],
        maxLength: [12, "Aadhar number should be of 10 digits!!"]
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
    },
    disease: {
        type: String,
        required: true
    },
    bp: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    meds: {
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true
    }


});


export const Pres = mongoose.model("Prescription", presSchema)
