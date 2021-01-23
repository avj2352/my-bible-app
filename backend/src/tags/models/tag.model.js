/**
 * Model for Tag server side schema
 */
import mongoose, { Schema } from 'mongoose';

export const TagSchema = new Schema({
    name: {
        type: String,
        required: 'Enter tag name',
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        required: 'Provide Description'
    }
});

TagSchema.index({ name: 'text', description: 'text' });
export const TagModel = mongoose.model('tags', TagSchema);
TagModel.createIndexes();