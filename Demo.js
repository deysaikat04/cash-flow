const data =
{
    "October": [
        {
            "_id": "5f7cb3bbbadcaf18505e0d19",
            "transactionType": "Expense",
            "amount": 150,
            "description": "None",
            "category": "Bill",
            "transactionMode": "Cash",
            "createdAt": "Tue Oct 06 2020"
        },
        {
            "_id": "5f7cb3f918c3d311f8557220",
            "transactionType": "Expense",
            "amount": 450,
            "description": "None",
            "category": "Groceries",
            "transactionMode": "Card",
            "createdAt": "Tue Oct 06 2020"
        }
    ],
    "September": [
        {
            "_id": "5f7cb4ca2264d91c54899a60",
            "transactionType": "Expense",
            "amount": 450,
            "description": "Testing Sept",
            "category": "Groceries",
            "transactionMode": "Card",
            "createdAt": "Tue Sept 06 2020"
        },
        {
            "_id": "5f7cb4e02264d91c54899a64",
            "transactionType": "Expense",
            "amount": 100,
            "description": "None",
            "category": "Food",
            "transactionMode": "Cash",
            "createdAt": "Tue Sept 06 2020"
        }
    ],
};

const keys = Object.keys(data);

Object.entries(data).forEach(([key, value]) => {
    console.log(key);
    console.log(value);
});