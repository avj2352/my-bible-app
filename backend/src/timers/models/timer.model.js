/**
 * Model for Tag server side schema
 */
import mongoose, { Schema } from 'mongoose';

export const TimerSchema = new Schema({
    description: {
        type: String,
        required: 'Provide Timer description',
        lowercase: true,
        trim: true,
    },
    timerType: {
      type: String,
      required: 'time type - item / recipe required',
      lowercase: true,
      trim: true,
    },
    time: {
        type: Number,
        required: 'Provide Timer duration in minutes/days'
    }
});

export const TimerModel = mongoose.model('timers', TimerSchema);