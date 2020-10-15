const Expense = require('../models/Expense');

async function expenseExistByUser(userId) {
    let expenseExists = await Expense.findOne(
        {
            $and: [
                { userId: userId },
                { year: new Date().getFullYear() }
            ]
        }
    );
    return expenseExists;
};

async function monthExistsByUser(userId, month) {
    let checkifMonthExists = await Expense.findOne(
        {
            $and: [
                { userId: userId },
                { year: new Date().getFullYear() },
                { 'months.monthName': month }
            ]
        }
    );
    return checkifMonthExists;
}

//month exists and updates transactions
async function pushInExistingMonth(userId, month, transactions) {
    let updateData = await Expense.findOneAndUpdate(
        {
            $and: [
                { userId: userId },
                { year: new Date().getFullYear() },
                { 'months.monthName': month }
            ]
        },
        {
            $push: { 'months.$.transactions': transactions },
            $set: { tou: new Date().toISOString() },
        },
        { new: true }
    );

    return updateData;
};

//month doesn't exist
async function pushNewTransaction(userId, month, monthObj) {
    let data = await Expense.updateOne(
        {
            $and: [
                { userId: userId },
                { year: new Date().getFullYear() }
            ]
        },
        {
            $push: { 'months': monthObj },
            $set: { tou: new Date().toISOString() },
        },
        { new: true }
    );
    return data;
}

async function getTransactionsByMonth(userId, month) {
    let data = await Expense.findOne(
        {
            $and: [
                { userId },
                { year: new Date().getFullYear() },
                { 'months.monthName': month }
            ]
        },
        { _id: 0, 'months.$': 1 }
    );

    let transactionsArray = data.months[0].transactions;
    return transactionsArray;
}


async function getAllTransactionByUser(userId) {
    let transactions = await Expense.findOne(
        { userId },
        { _id: 0, 'months.monthName': 1, 'months.transactions': 1 }
    );

    return transactions;
}

async function updateTransaction(userId, transactionId, monthName, year) {
    let updated = await Expense.updateOne(
        {
            $and: [
                { userId },
                { "months.monthName": monthName },
                { year }
            ]
        },
        { $pull: { "months.$.transactions": { "_id": transactionId } } }
    );
    return updated;
}
//------------ budget -------------------

//update
async function updateBudget(userId, month, amount) {
    let updateBudget = await Expense.updateOne(
        {
            $and: [
                { userId },
                { year: new Date().getFullYear() },
                { 'months.monthName': month }
            ]
        },
        { $set: { 'months.$.budget': amount } }
    );
    return updateBudget;
};

async function getBudgetByMonth(userId, month) {
    let budgetOfTheMonth = await Expense.aggregate([
        { $unwind: '$months' },
        {
            $match: {
                $and: [
                    { userId },
                    { 'months.monthName': month }
                ]
            }
        },
        { $project: { 'year': 1, 'months.budget': 1, 'months.monthName': 1, _id: 0 } }
    ]);

    return budgetOfTheMonth;
}


module.exports = {
    getTransactionsByMonth,
    expenseExistByUser,
    monthExistsByUser,
    pushInExistingMonth,
    pushNewTransaction,
    getAllTransactionByUser,
    updateBudget,
    getBudgetByMonth,
    updateTransaction
}