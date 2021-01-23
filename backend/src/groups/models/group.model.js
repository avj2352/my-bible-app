/**
 * Model for Group server side schema
 */
import mongoose, { Schema } from 'mongoose';

export const GroupSchema = new Schema({
    title: {
        type: String,
        required: 'Enter group title',
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        required: 'Enter group slug',
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        required: 'Provide group description'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

// Create Text index for Full search
GroupSchema.index({ title: 'text', description: 'text', slug: 'text' });
export const GroupModel = mongoose.model('groups', GroupSchema);
// GroupModel.createIndexes();