const mongoose = require('mongoose');


const Joi = require("joi");

const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    songs: { type: [String], default: [] },
    totalTracks: { type: Number, required: false, default: 0 },
    duration: { type: Number, required: false, default: 0 },
}, { timestamps: true });


const validateAlbum = (album) => {
    return Joi.object({
        title: Joi.string().required(),
        imageUrl: Joi.string().required(),
        artists: Joi.array().items(Joi.string().required()).required(),
    }).validate(album);
};

albumSchema.statics.getAlbumById = async function (id) {
    return await this.findOne({ _id: id });
}

albumSchema.statics.getAlbumsByArtistId = async function (id) {
    return await this.find({ artists: { $elemMatch: { _id: id } } });
}

const Album = mongoose.model('Album', albumSchema);

module.exports = { Album, validateAlbum }
