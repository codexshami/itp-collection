import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utlis/jwtToken.js"
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncErros(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, ano, role } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !ano || !role) {
        return next(new ErrorHandler("Please fill full form!", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already registered!!", 400));
    }
    user = await User.create({ firstName, lastName, email, phone, password, gender, dob, ano, role })
    generateToken(user, "User Registered!", 200, res);
});

export const login = catchAsyncErros(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please provide all details", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("password and confirm password do not match!", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Password or Email", 400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Password or Email", 400));
    }
    if (role !== user.role) {
        return next(new ErrorHandler("User with this role not found", 400));
    }
    generateToken(user, "User Logged in Successfully!", 200, res)
});


export const addNewAdmin = catchAsyncErros(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, ano } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !ano) {
        return next(new ErrorHandler("Please fill full form!", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists!`));
    }
    const admin = await User.create({ firstName, lastName, email, phone, password, gender, dob, ano, role: "Admin" });
    res.status(200).json({
        success: true,
        message: "New admin registered",
    });
});


export const getAllDoctors = catchAsyncErros(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors

    });
});


export const getUserDetails = catchAsyncErros(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    });
});


export const logoutAdmin = catchAsyncErros(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true, expires: new Date(Date.now()),
        secure: true,
        sameSite: 'None'
    }).json({
        success: true,
        message: "Admin Log out successfully!"
    })
})

export const logoutPatient = catchAsyncErros(async (req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true, expires: new Date(Date.now()), secure: true,
        sameSite: 'None'
    }).json({
        success: true,
        message: "Patient Log out successfully!"
    })
})


export const addNewDoctor = catchAsyncErros(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const {
        firstName, lastName, email, phone, ano, dob, gender, password, doctorDepartment,
    } = req.body;
    if (
        !firstName || !lastName || !email || !phone || !ano || !dob || !gender || !password || !doctorDepartment || !docAvatar
    ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(
            new ErrorHandler("Doctor With This Email Already Exists!", 400)
        );
    }
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(
        docAvatar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(
            new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
        );
    }
    const doctor = await User.create({
        firstName, lastName, email, phone, ano, dob, gender, password, role: "Doctor", doctorDepartment,
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "New Doctor Registered",
        doctor,
    });
});