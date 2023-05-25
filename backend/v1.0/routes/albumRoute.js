const router = require('express').Router();

const auth = require('../middlewares/authentication');

const albumController = require('../controllers/albumController');

router.post("/", [auth], albumController.createAlbum);
router.get("/:id",  albumController.getAlbumById);
router.get("/artist/:id",  albumController.getAlbumsByArtist);


module.exports = router;
