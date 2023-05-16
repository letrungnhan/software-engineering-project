const mongoose = require('mongoose');

const joi = require('joi');

// @desc The loai
const genreSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true, },
    imageUrl: { type: String, required: true, },
    total: { type: [], required: true },
}, { timestamps: true });

// @desc Validate genre
function validateGenre(genre) {
    const schema = joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        imageUrl: joi.string().required(),
        total: joi.array().required(),
    });
    return schema.validate(genre);
}



const Genre = mongoose.model('Genre', genreSchema);

module.exports = { Genre, validateGenre };