const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'], required: true, default: 'OTHER' },
    month: { type: String, required: true, },
    date: { type: String, required: true, },
    year: { type: String, required: true, },
    likedSongs: { type: [String], default: [], },
    playLists: { type: [String], default: [], },
    isAdmin: { type: Boolean, default: false, },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, name: this.name, isAdmin: this.isAdmin, },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: '7d' });
    return token;
}

const validateUser = (user) => {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: passwordComplexity().required(),
        month: joi.string().required(),
        date: joi.string().required(),
        year: joi.string().required(),
        gender: joi.string().valid("MALE", "FEMALE", "OTHER")
    });
    return schema.validate(user);
}


const User = mongoose.model('User', userSchema);
module.exports = { User, validateUser };