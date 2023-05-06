const router = require('express').Router();
const { login, getUserInfo } = require('../controllers/authController');
const auth = require('../middlewares/authentication');
//login
router.post("/login", login);
//get user info
router.get("/me", [auth], getUserInfo);


module.exports = router;
