const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {type: String, required: true,},
    imageUrl: {type: String, required: true,},
    follower: {type: Number, required: true,},
    artists: {type: [], required: true},
}, {timestamps: true});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = {Artist};