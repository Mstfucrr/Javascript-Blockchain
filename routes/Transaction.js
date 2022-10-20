const express = require('express')
const {AddTransaction,minerPendingTransactions}  = require('../controller/Transaction')
const router = express.Router()

router.post('/AddTransaction', async (req, res) => {
    const transaction = req.body;
    AddTransaction(transaction);
    res.json({ note: 'Transaction added successfully.' });
})

router.get('/minerPendingTransactions/:minerRewardAddress', async (req, res) => {
    const minerRewardAddress = req.params.minerRewardAddress;
    minerPendingTransactions(minerRewardAddress);
    res.json({ note: 'Transaction added successfully.' });
})

module.exports = router