/**
 * Model for Scripture - (Book, Chapter, Verse) server side schema
 */
import mongoose, { Schema } from 'mongoose';

export const ScriptureSchema = new Schema({
    book: {
        type: String,
        required: 'Provide Book Name',
        lowercase: true,
        trim: true,
    },
    chapter: {
        type: Number,
        default: 1
    },
    verse: {
        type: Number,
        default: 1
    }
});

ScriptureSchema.index({ book: 'text', chapter: 'text', verse: 'text' });
export const ScriptureModel = mongoose.model('scriptures', ScriptureSchema);
ScriptureModel.createIndexes();