const asyncHandler = require('express-async-handler');
const Song = require('../models/song');
const {User} = require("../models/user");


// @desc    create a new song
const createSong = asyncHandler(async (req, res) => {
    const {error} = Song.validateSong(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const song = await new Song(req.body).save();
    res.status(200).send({song, message: 'Song created successfully'});
});

// @desc    Update a song by id
const updateSongById = asyncHandler(async (req, res) => {
    const song = await Song.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
    if (!song) return res.status(404).send({
        message: 'Song not found'
    });
    res.status(200).send({song});
});

// @desc    Delete a song by id
const deleteSongById = asyncHandler(async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.status(200).send({message: 'Song deleted successfully'});
});

// @desc    Get a song by id
const getSongById = asyncHandler(async (req, res) => {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).send({message: 'Song not found'});
    res.status(200).send({song});
});

// @desc    Get all songs
const getSongs = asyncHandler(async (req, res) => {
    const songs = await Song.find();
    res.status(200).send({songs});
});

// @desc    Get a song by artist id
const getSongsByArtistId = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const songs = await Song.getSongsByArtistId(id);
    if (!songs) return res.status(404).send({message: 'Artist not found'});
    res.status(200).send({songs});
});

// @desc   like a song
const likeSong = asyncHandler(async (req, res) => {

    let responseMessage = '';

    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).send({
        message: 'Song not found'
    });

    const user = await User.findById(req.user._id);
    const index = user.likedSongs.indexOf(song._id);
    if (index === -1) {
        user.likedSongs.push(song._id);
        responseMessage = 'Song liked successfully';
    } else {
        user.likedSongs.splice(index, 1);
        responseMessage = 'Song unliked successfully';
    }
    res.status(200).send({message: responseMessage});
});

// @desc   get all liked songs
const getLikedSongs = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const songs = await Song.find({_id: {$in: user.likedSongs}});
    res.status(200).send({data: songs});
});

module.exports = {
    createSong,
    getSongs,
    getSongById,
    getSongsByArtistId,
    updateSongById,
    deleteSongById,
    likeSong,
    getLikedSongs
}
