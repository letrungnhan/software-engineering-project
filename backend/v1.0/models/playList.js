const mongoose = require('mongoose');
const joi = require('joi');

const ObjectId = mongoose.Schema.Types.ObjectId;

const playListSchema = new mongoose.Schema({
    name: {type: String, required: true,},
    user: {type: ObjectId, ref: 'User', required: true,},
    description: {type: String},
    songs: {type: Array, default: []},
    imageUrl: {type: String},
}, {timestamps: true});

const validatePlayList = (playList) => {
    const schema = joi.object({
        name: joi.string().required(),
        user: joi.string().required(),
        description: joi.allow(''),
        songs: joi.array().items(joi.string()),
        imageUrl: joi.allow(''),
    });
    return schema.validate(playList);
}


const PlayList = mongoose.model('PlayList', playListSchema);

module.exports = {PlayList, validatePlayList};
