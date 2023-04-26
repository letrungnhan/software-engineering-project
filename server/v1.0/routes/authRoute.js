const router = require('express').Router();
const { login } = require('../controllers/authController');
//login
router.post("/login", login);
module.exports = router;
