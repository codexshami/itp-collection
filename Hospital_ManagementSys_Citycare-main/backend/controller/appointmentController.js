import app from "../app.js";
import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncErros(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        ano,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstname,
        doctor_lastname,
        hasVisited,
        address,
    } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !ano ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstname ||
        !doctor_lastname ||
        !address
    ) {
        return next(new ErrorHandler("Please fill full form!", 400));
    }
    const isConflict = await User.find({
        firstName: doctor_firstname,
        lastName: doctor_lastname,
        role: "Doctor",
        doctorDepartment: department,
    });
    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found"));
    }
    if (isConflict.length > 1) {
        return next(
            new ErrorHandler("Doctor conflict! Please contact through email or phone")
        );
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        ano,
        dob,
        gender,
        appointment_date,
        department,
        doctor: { firstName: doctor_firstname, lastName: doctor_lastname },
        hasVisited,
        address,
        doctorId,
        patientId,
    });
    res.status(200).json({
        success: true,
        message: "Appointment Sent successfully!",
        appointment,
    });
});

export const getAllAppointment = catchAsyncErros(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments,
    });
});

export const getUserAppointments = catchAsyncErros(async (req, res, next) => {
    const { _id } = req.user;
    const appointments = await Appointment.find({ patientId: _id });
    res.status(200).json({
        success: true,
        appointments,
    });
});

export const updateAppointmentStatus = catchAsyncErros(
    async (req, res, next) => {
        const { id } = req.params;
        let appointment = await Appointment.findById(id);
        if (!appointment) {
            return next(new ErrorHandler("Appointment not found", 404));
        }
        appointment = await Appointment.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            message: "Appointment status updated",
            appointment,
        });
    }
);

export const deleteAppointment = catchAsyncErros(async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success: true,
        message: "Appointment Deleted",
    });
});
