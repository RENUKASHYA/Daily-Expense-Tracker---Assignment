const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    splitMethod: {
        type: String,
        enum: ['equal', 'exact', 'percentage'],
        required: true
    },
    splitDetails: {
        type: Map,
        of: Number
    }
})

module.exports = mongoose.model('Expense', expenseSchema)