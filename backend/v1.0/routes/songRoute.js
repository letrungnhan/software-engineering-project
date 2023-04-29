const router = require('express').Router();


const { createSong,
    getSongs,
    getSongById,
    updateSongById,
    deleteSongById,
    likeSong,
    getLikedSongs } = require('../controllers/songController');

const auth = require('../middlewares/authentication');
const admin = require('../middlewares/administrator');
const validateObjectId = require('../middlewares/validateObjectId');

// create a new song
router.post("/create", [admin], createSong);
router.get("/songs", getSongs);
router.get("/song/:id", [validateObjectId], getSongById);
router.put("/song/:id", [admin, validateObjectId], updateSongById);
router.delete("/song/:id", [admin, validateObjectId], deleteSongById);
router.put("/song/like/:id", [auth, validateObjectId], likeSong);
router.get("/songs/liked", [auth], getLikedSongs);



module.exports = router;
