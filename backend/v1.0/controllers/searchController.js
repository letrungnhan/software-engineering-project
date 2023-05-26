
const asyncHandler = require('express-async-handler');

const Song = require('../models/song');
const { Album } = require('../models/album');
const { User } = require('../models/user');
const { PlayList } = require('../models/playlist');

// @desc    Search for a song 

const search = asyncHandler(async (req, res) => {
    const searchQuery = req.query.q;
    if (searchQuery !== "") {
        const songs = await Song.find({
            title: { $regex: searchQuery, $options: 'i' }
        }).limit(10);
        const playlists = await PlayList.find({
            name: { $regex: searchQuery, $options: 'i' }
        }).limit(10);
        const albums = await Album.find({
            title: { $regex: searchQuery, $options: 'i' }
        }).limit(10);
        const artists = await User.find({
            name: { $regex: searchQuery, $options: 'i' }
        }).limit(10);
        const result = { songs, albums, playlists, artists };
        res.status(200).send({ result });

    } else {
        res.status(200).send({ message: "No search query" });
    }


});

module.exports = { search };

