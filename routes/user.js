const express = require('express')
const {getBalanceOfAddress}  = require('../controller/User')
const router = express.Router()


router.get('/getBalanceOfAddress/:address', async (req, res) => {
    const balance = await getBalanceOfAddress(req.params.address);
    res.json(balance);
})


module.exports = router