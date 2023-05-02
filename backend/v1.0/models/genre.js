const mongoose = require('mongoose');

const joi = require('joi');

// @desc The loai
const genreSchema = new mongoose.Schema({
    title: {type: String, required: true,},
    description: {type: String, required: true,},
    imageUrl: {type: String, required: true,},
    total: {type: [], required: true},
}, {timestamps: true});


const Genre = mongoose.model('Genre', genreSchema);

module.exports = {Genre};