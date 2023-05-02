const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true,},
    email: {type: String, required: true, unique: true,},
    password: {type: String, required: true,},
    gender: {type: String, enum: ['MALE', 'FEMALE', 'OTHER'], required: true, default: 'OTHER'},
    birthday: {type: Date, required: true,},
    likedSongs: {type: [String], default: [],},
    playLists: {type: [String], default: [],},
    isArtist: {type: Boolean, default: true,},
    isAdmin: {type: Boolean, default: false,},
}, {timestamps: true})

userSchema.methods.generateAuthToken = function () {
    const payload = {_id: this._id, name: this.name, isAdmin: this.isAdmin};
    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {expiresIn: '7d'});
}

const validateUser = (user) => {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: passwordComplexity().required(),
        birthday: joi.date().required(),
        gender: joi.string().valid("MALE", "FEMALE", "OTHER")
    });
    return schema.validate(user);
}


const User = mongoose.model('User', userSchema);

module.exports = {User, validateUser};