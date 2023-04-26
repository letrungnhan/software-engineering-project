const mongoose = require('mongoose');

const joi = require('joi');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    artist: { type: String, required: true, },
    songSrc: { type: String, required: true, },
    imageUrl: { type: String, required: true, },
    duration: { type: Number, required: true, },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const validateSong = (song) => {
    const schema = joi.object({
        title: joi.string().required(),
        artist: joi.string().required(),
        songSrc: joi.string().required(),
        imageUrl: joi.string().min(3).max(50).required(),
        duration: joi.number().required(),
    });
    return schema.validate(song);
}


const Song = mongoose.model('Song', songSchema);

module.exports = { Song, validateSong };