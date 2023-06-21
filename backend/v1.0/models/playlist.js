/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const mongoose = require('mongoose');
const joi = require('joi');

const playListSchema = new mongoose.Schema({
    name: {type: String, required: true,},
    description: {type: String},
    imageUrl: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,},
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song', default: []}],
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