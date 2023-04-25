
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
    res.status(200).send({ data: token, message: 'Signing...' });

});

module.exports = { login };