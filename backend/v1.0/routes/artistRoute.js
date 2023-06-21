const router = require('express').Router();

const { getArtistById } = require('../controllers/artistController');

router.get("/:id", getArtistById);

module.exports = router;
