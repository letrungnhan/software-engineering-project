
const asyncHandler = require('express-async-handler');
const { Song, validateSong } = require('../models/song');
const { PlayList } = require('../models/playlist');

// @desc    Search for a song 

const search = asyncHandler(async (req, res) => {
    const searchQuery = req.query.q;
    if (search !== "") {
        const songs = await Song.find({
            title: { $regex: searchQuery, $options: 'i' }
        }).limit(10);
        const playlists = await PlayList.find({
            name: { $regex: searchQuery, $options: 'i' }
        }).limit(10);
        const result = { songs, playlists };
        res.status(200).send({ data: result });

    } else {
        res.status(200).send({ message: "No search query" });
    }
});

module.exports = { search };

