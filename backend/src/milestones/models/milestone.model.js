/**
 * Model for Questionnaire server side schema
 */
import mongoose, { Schema } from 'mongoose';

export const MilestoneSchema = new Schema({
    title: {
        type: String,
        required: 'Enter Milestone title'
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
    timer: {
        type: Schema.Types.ObjectId,
        ref: 'timers'
    },
    completed: [{
        book : {
            type: Number,
            required: 'Provide book id'
        },
        chapters: [{
            type: Number,
            required: 'Provide chapter number'
        }]
    }]
});

export const MilestoneModel = mongoose.model('milestones', MilestoneSchema);