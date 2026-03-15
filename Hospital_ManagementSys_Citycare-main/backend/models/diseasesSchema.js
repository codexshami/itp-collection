import mongoose from 'mongoose';

const diseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    def: {
        type: String,
        required: true
    },
    symptoms: {
        type: [String],
        default: []
    },
    url: {
        type: String,
        unique: true // If URLs should be unique
    }
});

export const Disease = mongoose.model('Disease', diseaseSchema);


