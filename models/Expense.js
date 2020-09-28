const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ExpenseSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'User Id is required']
    },
    year: {
        type: Number,
        default: new Date().getFullYear()
    },
    months: [
        {
            monthName: {
                type: String,
                required: [true, 'Month Name is required']
            },
            budget: {
                type: Number,
                default: 0
            },
            transactions: [
                {
                    transactionType: {
                        type: String,
                        required: true
                    },
                    amount: {
                        type: Number,
                        required: true
                    },
                    description: {
                        type: String,
                        required: true
                    },
                    category: {
                        type: String,
                        required: true
                    },
                    transactionMode: {
                        type: String,
                        required: true
                    },
                    createdAt: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ],
    toc: {
        type: Date,
        default: Date.now
    },
    tou: {
        type: Date,
        default: Date.now
    }
});

module.exports = Expense = mongoose.model('expense', ExpenseSchema);
