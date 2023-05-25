const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    imageUrl: { type: String, required: true, },
    artists: { type: [], required: true },
    songs: { type: Array, required: true, default: [] },
    totalTracks: { type: Number, required: false, default: 0 },
    duration: { type: Number, required: false, default: 0 },
}, { timestamps: true });

albumSchema.statics.getAlbumById = async function (id) {
    return await this.findOne({ _id: id });
}

albumSchema.statics.getAlbumsByArtistId = async function (id) {
    return await this.find({ artists: { $elemMatch: { _id: id } } });
}

module.exports = mongoose.model('Album', albumSchema);
