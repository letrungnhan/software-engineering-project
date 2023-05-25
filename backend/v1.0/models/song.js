const mongoose = require('mongoose');

const joi = require('joi');

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true, },
}, { timestamps: true });

const songSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    songSrc: { type: String, required: true, },
    imageUrl: { type: String, required: true, },
    duration: { type: Number, required: true, },
    artists: { type: [artistSchema], required: true },
    albumId: { type: String, required: false },
}, { timestamps: true });

songSchema.statics.validateSong = function (song) {
    const schema = joi.object({
        title: joi.string().required(),
        artists: joi.array().required(),
        songSrc: joi.string().required(),
        imageUrl: joi.string().required(),
        duration: joi.number().required(),
        genre: joi.string().required(),
    });
    return schema.validate(song);
}

songSchema.statics.getSongsByAllId = async function (ids) {
    return await this.find({
        '_id': { $in: ids }
    });
}

songSchema.statics.getSongsByArtistId = async function (id) {
    return await this.find({
        artists: {
            $elemMatch: { _id: id }
        }
    });
}

module.exports = mongoose.model('Song', songSchema);
