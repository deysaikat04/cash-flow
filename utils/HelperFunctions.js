function toArray(obj) {
    transactionArray = [];

    obj.months.map(data => {
        data.transactions.map(item => {
            transactionArray.push(item);
        })
    })

    return transactionArray;
}

module.exports = {
    toArray
}