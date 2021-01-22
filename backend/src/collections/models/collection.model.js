/**
 * Model for Collection - Collection of Recipes
 */
import mongoose, { Schema } from 'mongoose';

export const CollectionSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: 'Enter Collection Title',
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    recipes: [{
        type: Schema.Types.ObjectId,
        ref: 'recipes'
    }],
});

export const CollectionModel = mongoose.model('collections', CollectionSchema);