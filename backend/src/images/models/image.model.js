/**
 * Model for Images
 */
import mongoose, { Schema } from 'mongoose';

export const ImageSchema = new Schema({
    title: {
        type: String,
        required: 'Enter Item',
        unique: true,
        lowercase: true,
        trim: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    created: {
        type: Date,
        default: Date.now
    },
    data: {
        type: String,
        required: 'Required base64 encoded image string'
    }
});

export const ImageModel = mongoose.model('images', ImageSchema);