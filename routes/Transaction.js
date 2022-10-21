const express = require('express')
const {AddTransaction,minerPendingTransactions}  = require('../controller/Transaction')
const router = express.Router()

router.post('/AddTransaction', async (req, res) => {
    AddTransaction(req.body.fromAddress, req.body.toAddress, parseInt(req.body.amount));
    res.json({ note: 'Transaction added successfully.' });
})

router.post('/minerPendingTransactions', async (req, res) => {
    minerPendingTransactions(req.body.minerRewardAddress);
    res.json({ note: 'Mine is successfully' });
})

module.exports = router