const router = require('express').Router();

const {createUser, getUsers, getUserById, updateUserById, deleteUserById} = require('../controllers/userController');
const auth = require('../middlewares/authentication');
const admin = require('../middlewares/administrator');
const validateObjectId = require('../middlewares/validateObjectId');

// create a new user
router.get("/", admin, getUsers);
router.post("/create", createUser);
router.get("/user/:id", [auth, validateObjectId], getUserById);
router.put("/user/:id", [auth, validateObjectId], updateUserById);
router.delete("/user/:id", [admin, validateObjectId], deleteUserById);


module.exports = router;
