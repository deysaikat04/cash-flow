const mongoose = require('mongoose');

const db = "mongodb+srv://sd123:sd123@cashflow.szgd0.mongodb.net/expensedb?retryWrites=true&w=majority";

const conenctDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected..');
    } catch (error) {
        consolr.error(error.message);
        process.exit(1);
    }
};

module.exports = conenctDB;