const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Store all constants related to User model
 */

export const USER_ROLES = {
    FREE: 'free',
    PREMIUM: 'premium',
    ADMIN: 'admin'
};

export const USER_STATUS = {
    INACTIVE: 'inactive',
    ACTIVE: 'active'
}

export const UserSchema = new Schema({
    googleId: {
      type: String,
      required: 'Google Profile Id is required'
    },
    name: {
        type: String,
        required: 'Name from the Google Sign in is required'
    },
    email: {
        type: String,
        required: 'Username / email is required'
    },
    role: {
        type: String,
        default: USER_ROLES.FREE
    },
    status: {
        type: String,
        default: USER_STATUS.INACTIVE
    },
    collectionCount: {
        type: Number,
        default: 5
    },
    draftCount: {
        type: Number,
        default: 5
    }
});

mongoose.model('users', UserSchema);

export const User = mongoose.model('users');

