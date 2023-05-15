const router = require('express').Router();


const songController = require('../controllers/songController');

const auth = require('../middlewares/authentication');
const admin = require('../middlewares/administrator');
const validateObjectId = require('../middlewares/validateObjectId');

// create a new song
router.post("/", [auth], songController.createSong);
router.put("/:id", [admin, validateObjectId], songController.updateSongById);
router.delete("/:id", [admin, validateObjectId], songController.deleteSongById);
router.get("/artist/:id", [validateObjectId], songController.getSongsByArtistId);
router.get("/liked", [auth], songController.getLikedSongs);
router.put("/like/:id", [auth, validateObjectId], songController.likeSong);
router.get("/:id", [validateObjectId], songController.getSongById);
router.get("/", songController.getSongs);


module.exports = router;
