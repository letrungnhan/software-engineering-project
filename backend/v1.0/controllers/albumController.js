const asyncHandler = require('express-async-handler');
const Song = require('../models/song');
const Album = require('../models/album');
const { User } = require("../models/user");


const createAlbum = asyncHandler(async (req, res) => {
    const album = await new Album(req.body).save();
    res.status(200).send({ album, message: 'Album created successfully' });
});

const getAlbumById = asyncHandler(async (req, res) => {
    const album = await Album.getAlbumById(req.params.id);
    res.status(200).send({ album });
});

const getAlbumsByArtist = asyncHandler(async (req, res) => {
    const albums = await Album.getAlbumsByArtistId(req.params.id);
    res.status(200).send({ albums });
});

module.exports = {
    createAlbum, getAlbumById, getAlbumsByArtist
}
