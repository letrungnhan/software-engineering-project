const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {type: String, required: true,},
    imageUrl: {type: String, required: true,},
    duration: {type: Number, required: true,},
    artists: {type: [], required: true},
    totalTracks: {type: Number, required: true, default: 0},
    totalTimes: {type: String, required: true},
}, {timestamps: true});


const Album = mongoose.model('Album', albumSchema);

module.exports = {Album};