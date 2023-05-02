const router = require('express').Router();


const {
    createSong,
    getSongs,
    getSongById,
    updateSongById,
    deleteSongById,
    likeSong,
    getLikedSongs
} = require('../controllers/songController');

const auth = require('../middlewares/authentication');
const admin = require('../middlewares/administrator');
const validateObjectId = require('../middlewares/validateObjectId');

// create a new song
router.post("/", [auth], createSong);
router.put("/:id", [admin, validateObjectId], updateSongById);
router.delete("/:id", [admin, validateObjectId], deleteSongById);
router.get("/:id", [validateObjectId], getSongById);
router.get("/", getSongs);
router.get("/liked", [auth], getLikedSongs);
router.put("/like/:id", [auth, validateObjectId], likeSong);


module.exports = router;
