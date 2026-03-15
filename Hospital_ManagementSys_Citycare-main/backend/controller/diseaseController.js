import { catchAsyncErros } from "../middlewares/catchAsyncErros.js"
import { Disease } from "../models/diseasesSchema.js"

export const getAllDiseases = catchAsyncErros(async (req, res, next) => {
    const diseases = await Disease.find({});
    res.status(200).json({
        success: true,
        message: "Retrieved all data",
        diseases
    });

})