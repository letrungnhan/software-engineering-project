const asyncHandler = require('express-async-handler');
const Song = require('../models/song');
const { Album, validateAlbum } = require('../models/album');
const { User } = require("../models/user");

const createAlbum = asyncHandler(async (req, res) => {
    const { error } = validateAlbum(req.body);
    if (error) {
        res.status(400).send({ message: error.details[0].message });
        return;
    }
    const { artists } = req.body;
    if (!Array.isArray(artists)) {
        res.status(400).send({ message: 'Artists must be provided as an array' });
        return;
    }
    try {
        const users = await User.find({ _id: { $in: artists }, isArtist: true });
        if (users.length !== artists.length) {
            const validArtistIds = users.map(user => user._id);
            const invalidArtistIds = artists.filter(artistId => !validArtistIds.includes(artistId));
            res.status(400).send({ message: `One or more artists are not valid: ${invalidArtistIds.join(', ')}` });
            return;
        }
        const album = new Album({
            ...req.body,
            artists: users.map(user => user._id),
        });
        await album.save();
        res.status(200).send({ album, message: 'Album created successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

const addSongToAlbum = asyncHandler(async (req, res) => {
    const { albumId, songId } = req.params;
    const album = await Album.findById(albumId);
    if (!album) {
        res.status(404).send({ message: 'Album not found' });
        return;
    }
    const song = await Song.findById(songId);
    if (!song) {
        res.status(404).send({ message: 'Song not found' });
        return;
    }
    if (album.songs.includes(songId)) {
        res.status(400).send({ message: 'Song already exists in album' });
        return;
    }
    album.songs.push(songId);
    album.totalTracks += 1;
    album.duration += song.duration;
    await album.save();
    res.status(200).send({ album, message: 'Song added to album successfully' });
});

const removeSongFromAlbum = asyncHandler(async (req, res) => {
    const { albumId, songId } = req.params;
    const album = await Album.findById(albumId);
    if (!album) {
        res.status(404).send({ message: 'Album not found' });
        return;
    }
    const song = await Song.findById(songId);
    if (!song) {
        res.status(404).send({ message: 'Song not found' });
        return;
    }
    if (!album.songs.includes(songId)) {
        res.status(400).send({ message: 'Song does not exist in album' });
        return;
    }
    album.songs = album.songs.filter(song => song !== songId);
    album.totalTracks -= 1;
    album.duration -= song.duration;
    await album.save();
    res.status(200).send({ album, message: 'Song removed from album successfully' });
});

const addArtistToAlbum = asyncHandler(async (req, res) => {
    const albumId = req.params.albumId;
    const artistId = req.params.artistId;
    const album = await Album.findById(albumId).select('-__v');
    if (!album) {
        res.status(404).send({ message: 'Album not found' });
        return;
    }
    const artist = await User.findById(artistId).select('-password -__v');
    if (!artist) {
        res.status(404).send({ message: 'Artist not found' });
        return;
    }
    if (album.artists.includes(artistId)) {
        res.status(400).send({ message: 'Artist already exists in album' });
        return;
    }
    album.artists.push(artistId);
    await album.save();
    res.status(200).send({ album, message: 'Artist added to album successfully' });
});

const removeArtistFromAlbum = asyncHandler(async (req, res) => {
    const { albumId, artistId } = req.params;

    const album = await Album.findById(albumId).select('-__v');
    if (!album) {
        res.status(404).send({ message: 'Album not found' });
        return;
    }
    const artist = await User.findById(artistId).select('-password -__v');
    if (!artist) {
        res.status(404).send({ message: 'Artist not found' });
        return;
    }
    if (!album.artists.includes(artistId)) {
        res.status(400).send({ message: 'Artist does not exist in album' });
        return;
    }
    album.artists = album.artists.filter(artist => artist.toString() !== artistId.toString());

    await album.save();
    res.status(200).send({ album, message: 'Artist removed from album successfully' });
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
    createAlbum, getAlbumById, getAlbumsByArtist,
    addSongToAlbum, removeSongFromAlbum,
    addArtistToAlbum, removeArtistFromAlbum,
}
