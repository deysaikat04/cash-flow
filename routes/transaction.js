const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
var jwt = require('jsonwebtoken');
const config = require('config');
const { toArray } = require('../utils/HelperFunctions');
const { expenseExistByUser,
    getTransactionsByMonth,
    pushInExistingMonth,
    monthExistsByUser,
    pushNewTransaction,
    getAllTransactionByUser,
    updateBudget,
    getBudgetByMonth,
    updateTransaction
} = require('../utils/DbFunctions');
const auth = require('../middleware/auth');



router.get('/monthly/:month', auth, async (req, res) => {
    const { month } = req.params;
    const userId = req.user.id;
    try {
        let userExists = await expenseExistByUser(userId);
        if (!userExists) {
            res.json([]);
        } else {
            try {
                var TransactionArr = await getTransactionsByMonth(userId, month);
                res.json(TransactionArr.reverse());
            } catch (error) {
                res.json([]);
            }
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// create or update entry
router.post('/add', auth, async (req, res) => {

    const { transactionType, amount, description, category, transactionMode, createdAt, monthName, yearName } = req.body;
    const userId = req.user.id;

    const transactions = {
        transactionType,
        amount,
        description,
        category,
        transactionMode,
        createdAt
    };

    const month = {
        monthName,
        transactions: transactions
    };

    const expense = new Expense({
        userId,
        year: yearName,
        months: month
    });


    try {

        let expenseExists = await expenseExistByUser(userId);

        //checking if document for a user is already created
        if (expenseExists) {
            let checkifMonthExists = await monthExistsByUser(userId, monthName);

            // checking if a particular month exists
            if (checkifMonthExists) {
                let updateData = await pushInExistingMonth(userId, monthName, transactions);
                if (updateData) {
                    var TransactionArr = await getTransactionsByMonth(userId, monthName);
                    res.json(TransactionArr.reverse());
                } else {
                    res.status(500).send('Server Error');
                }

            } else {
                // month doesn't exist
                let updateData = await pushNewTransaction(userId, monthName, month);

                if (updateData.nModified === 1) {
                    var allTransactions = await getAllTransactionByUser(userId);
                    let data = toArray(allTransactions);
                    res.json(data.reverse());
                } else {
                    res.status(500).send('Server Error');
                }

            }

        } else {
            let data = await expense.save();

            res.json(toArray(data));
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/update', auth, async (req, res) => {

    const { id, transactionType, amount, description, category, transactionMode, createdAt, monthName, year } = req.body;
    const userId = req.user.id;

    const transactions = {
        transactionType,
        amount,
        description,
        category,
        transactionMode,
        createdAt
    };

    const month = {
        monthName,
        transactions: transactions
    };

    const expense = new Expense({
        userId,
        year,
        months: month
    });


    try {

        let expenseExists = await updateTransaction(userId, id, monthName, year);

        //checking if document for a user is already created
        if (expenseExists.nModified == 1) {
            let updateData = await pushInExistingMonth(userId, monthName, transactions);
            if (updateData) {
                var TransactionArr = await getTransactionsByMonth(userId, monthName);
                res.json(TransactionArr.reverse());
            } else {
                res.status(500).send('Server Error');
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/remove/:id/:month/:year', auth, async (req, res) => {

    const { id, month, year } = req.params;
    const userId = req.user.id;

    try {

        let expenseExists = await updateTransaction(userId, id, month, year);

        //checking if document for a user is already created
        if (expenseExists.nModified == 1) {
            res.json({ data: { message: "Deleted successfully!" } });

        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//get expense details by user
router.get('/all', auth, async (req, res) => {
    const userId = req.user.id;

    try {
        //check if user exists
        let expenseExists = await expenseExistByUser(userId);

        if (!expenseExists) {
            res.json([]);
        } else {

            let transactions = await getAllTransactionByUser(userId);

            let allTransactionsArray = [];

            transactions.months.map(data => {
                data.transactions.map(item => {
                    allTransactionsArray.push(item);
                })
            })

            res.json(allTransactionsArray.reverse());
        }

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//get expense details of a user based on month
router.get('/totalByMonth/:month', auth, async (req, res) => {
    const { month } = req.params;
    const userId = req.user.id;

    try {
        //check if user exists
        let monthExists = await Expense.findOne(
            {
                $and: [
                    { userId },
                    { year: new Date().getFullYear() },
                    { 'months.monthName': month }
                ]
            },
            { _id: 0, 'months.$': 1 }
        );
        if (!monthExists) {
            res.status(400).json({ errors: "Month doesn't exist!" });
        } else {
            let transactionsArray = monthExists.months[0].transactions;
            res.json(transactionsArray);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//update budget
router.post('/setBudget', auth, async (req, res) => {
    const { month, amount } = req.body;
    const userId = req.user.id;
    try {
        //check if user exists
        let monthExists = await monthExistsByUser(userId, month);

        if (!monthExists) {
            res.status(400).json({ errors: "Error while saving!" });
        } else {
            let updated = await updateBudget(userId, month, amount);

            let budgetObj = {
                amount: amount,
                month: month,
                year: new Date().getFullYear()
            }
            res.json(budgetObj);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});

router.get('/getBudget/:month', auth, async (req, res) => {
    const { month } = req.params;
    const userId = req.user.id;
    try {
        //check if user exists
        let monthExists = await getBudgetByMonth(userId, month);

        if (monthExists.length === 0) {
            res.json({ amount: 0 });
        } else {
            let budgetObj = {
                amount: monthExists[0].months.budget,
                month: monthExists[0].months.monthName,
                year: monthExists[0].year
            }
            res.json(budgetObj);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

router.get('/grouped', auth, async (req, res) => {

    let userId = req.user.id;

    let data = await Expense.aggregate([
        { $unwind: '$months' },
        {
            $match: {
                $and: [
                    { year: new Date().getFullYear() },
                    { userId }
                ]
            }
        },
        { $project: { 'months.monthName': 1, 'months.transactions': 1, _id: 0 } }
    ]);

    let returnedData = {};

    data.map((item, index) => {
        let monthObj = {};
        var { monthName, transactions } = item.months;
        monthObj[monthName] = transactions.reverse();
        returnedData = { ...returnedData, ...monthObj };
    })
    res.json(returnedData)
})

module.exports = router;