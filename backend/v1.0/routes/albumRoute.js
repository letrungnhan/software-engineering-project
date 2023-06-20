const router = require('express').Router();

const auth = require('../middlewares/authentication');
const validateObjectId = require('../middlewares/validateObjectId');
const albumController = require('../controllers/albumController');

router.post("/", [auth], albumController.createAlbum);
router.get("/:id", albumController.getAlbumById);
router.get("/artist/:id", albumController.getAlbumsByArtist);

router.post("/:albumId/add-artist/:artistId", [auth], albumController.addArtistToAlbum);
router.post("/:albumId/remove-artist/:artistId", [auth], albumController.removeArtistFromAlbum);
router.post("/:albumId/add-song/:songId", [auth], albumController.addSongToAlbum);
router.post("/:albumId/remove-song/:songId", [auth], albumController.removeSongFromAlbum);


module.exports = router;
