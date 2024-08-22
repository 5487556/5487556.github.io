const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/finance', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const transactionSchema = new mongoose.Schema({
    date: String,
    description: String,
    amount: Number,
    type: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.post('/api/transactions', async (req, res) => {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.send(transaction);
});

app.get('/api/transactions', async (req, res) => {
    const transactions = await Transaction.find();
    res.send(transactions);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
});
