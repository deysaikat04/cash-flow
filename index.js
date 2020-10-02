const express = require('express');
const app = express();
const connectDB = require('./config/db');
const transaction = require('./routes/transaction');
const user = require('./routes/userRoute');
const path = require('path');
const expressSanitizer = require('express-sanitizer');

var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(expressSanitizer());

connectDB();

app.use(express.static('client/build'));

app.get('/favicon.ico', (req, res) => res.status(204));


app.use('/api/transactions', transaction);
app.use('/api/auth', user);

// app.use('*', (req, res) => {
//     res.status(404).json({ error: { message: 'Invalid route!' } });
// })

//Serve static assets in production
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
