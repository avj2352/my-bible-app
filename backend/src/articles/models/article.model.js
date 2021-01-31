/**
 * Model for Articles - server side schema
 */
import mongoose, { Schema } from 'mongoose';

export const ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: 'Enter Article Title',
        lowercase: true,
        trim: true,
    },
    link: {
        type: String,
        trim: true
    },    
    content: {
        type: String,
        required: 'Enter Article Content',
        trim: true
    },
    html: {
        type: String,
        required: 'Enter Article Content in HTML',
    },
    createdBy: {
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
    scriptures: [{
        type: Schema.Types.ObjectId,
        ref: 'scriptures'
    }]
});

ArticleSchema.index({ title: 'text', content: 'text', html: 'text' });
export const ArticleModel = mongoose.model('articles', ArticleSchema);
// ArticleModel.createIndexes();