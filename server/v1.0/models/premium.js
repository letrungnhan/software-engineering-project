const mongoose = require('mongoose');

const premiumSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: false },
    subscriptionType: { type: String, enum: ['DAILY', 'MONTHLY', 'YEARLY'], default: 'DAILY' },
    price: { type: Number, required: true },
}, { timestamps: true });

const validatePremium = (premium) => {
    const schema = joi.object({
        userId: joi.string().required(),
        startDate: joi.date().required(),
        endDate: joi.date().required(),
        isActive: joi.boolean().required(),
        subscriptionType: joi.string().valid('DAILY', 'MONTHLY', 'YEARLY').required(),
        price: joi.number().required(),
    });
    return schema.validate(premium);
}

const Premium = mongoose.model('Premium', premiumSchema);

module.exports = { Premium, validatePremium };