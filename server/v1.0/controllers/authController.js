
const { User } = require('../models/user');
const asyncHandler = require('express-async-handler');

const bcrypt = require('bcrypt');

// @desc    login a user

const login = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({
        message: 'Invalid email or password.'
    });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({
        message: 'Invalid email or password.'
    });

    const token = user.generateAuthToken();
    res.status(200).send({
        data: token,
        userId: user._id,
        message: 'Signing...'
    }
    );
});
// get user info by token

const getUserInfo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).send({
        message: 'User not found.'
    });
    res.status(200).send({ data: user, message: 'User info.' });
});

module.exports = { login, getUserInfo };