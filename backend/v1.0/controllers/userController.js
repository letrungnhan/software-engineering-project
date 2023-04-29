const asyncHandler = require('express-async-handler');
const {User, validateUser} = require('../models/user');
const bcrypt = require('bcrypt');

// @desc    Register a new user
const createUser = asyncHandler(async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered.');

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let newUser = await new User({...req?.body, password: hashedPassword,}).save();
    newUser.password = undefined;
    newUser.__v = undefined;
    res.status(200).send({data: newUser, message: 'Account created successfully'});
});

// @desc    Get all users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password -__v');
    res.status(200).send({data: users});
});

// @desc    Get a user by id
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -__v');
    if (!user) return res.status(404).send({
        message: 'User not found'
    });
    res.status(200).send({data: user});
});

// @desc    Update a user by id
const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new: true}
    ).select('-password -__v');
    if (!user) return res.status(404).send('User not found');
    res.status(200).send({data: user});
});

// @desc    Delete a user by id
const deleteUserById = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({message: 'User deleted successfully'});

});


module.exports = {createUser, getUsers, getUserById, updateUserById, deleteUserById};