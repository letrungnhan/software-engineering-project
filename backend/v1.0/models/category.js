const mongoose = require('mongoose');

const joi = require('joi');

// @desc The loai
const categorySchema = new mongoose.Schema({
    name: {type: String, required: true,},
    imageUrl: {type: String, required: true,},
}, {timestamps: true});

const Category = mongoose.model('Category', categorySchema);

module.exports = {Category};