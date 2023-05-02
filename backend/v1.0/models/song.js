const mongoose = require('mongoose');

const joi = require('joi');

const artistSchema = new mongoose.Schema({
    name: {type: String, required: true,},
    // imageUrl: {type: String, required: true,},
    // follower: {type: Number, required: true,},
}, {timestamps: true});

const songSchema = new mongoose.Schema({
    title: {type: String, required: true,},
    songSrc: {type: String, required: true,},
    imageUrl: {type: String, required: true,},
    duration: {type: Number, required: true,},
    artists: {type: [artistSchema], required: true},
    albumId: {type: String, required: false},
}, {timestamps: true});

const validateSong = (song) => {
    const schema = joi.object({
        title: joi.string().required(),
        artists: joi.array().required(),
        songSrc: joi.string().required(),
        imageUrl: joi.string().required(),
        duration: joi.number().required(),
    });
    return schema.validate(song);
}


const Song = mongoose.model('Song', songSchema);

module.exports = {Song, validateSong};