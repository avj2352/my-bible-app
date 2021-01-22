/**
 * Model for Questionnaire server side schema
 */
import mongoose, { Schema } from 'mongoose';

export const InventorySchema = new Schema({
    title: {
        type: String,
        required: 'Enter Inventory title'
    },
    description: {
        type: String,
        required: 'Provide group description'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    created: {
        type: Date,
        default: Date.now
    },
    meta: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'items'
        },
        remarks: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 0
        },
        expiry: {
            type: Date,
            default: Date.now
        }
    }],
});

export const InventoryModel = mongoose.model('inventory', InventorySchema);