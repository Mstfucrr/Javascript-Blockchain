const express = require('express')
const {getBalanceOfAddress ,getTransactionsOfAddress}  = require('../controller/User')
const router = express.Router()


router.post('/getBalanceOfAddress', async (req, res) => {
    const balance = await getBalanceOfAddress(req.body.Address);
    res.json(balance);
})

router.post('/getTransactionsOfAddress', async (req, res) => {
    const transactions = await getTransactionsOfAddress(req.body.Address);
    res.json(transactions);
})

module.exports = router