/**
 * Model for Items - (Vegetables, Fruits, Spices) server side schema
 */
import mongoose, { Schema } from 'mongoose';

export const RecipeSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: 'Enter Recipe Title',
        unique: true,
        lowercase: true,
        trim: true,
    },
    link: {
        type: String,
        trim: true
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    content: {
        type: String,
        required: 'Enter Recipe Content',
        trim: true
    },
    html: {
        type: String,
        required: 'Enter Recipe Content in HTML',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'groups',
        required: 'Provide group Id'
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tags'
    }],
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'items'
    }],
    timers: [{
        type: Schema.Types.ObjectId,
        ref: 'timers'
    }]
});

RecipeSchema.index({ title: 'text', content: 'text', html: 'text' });
export const RecipeModel = mongoose.model('recipes', RecipeSchema);
// RecipeModel.createIndexes();