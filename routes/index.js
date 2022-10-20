const express = require('express')
const {getBlockchain,getBlockByHash}  = require('../controller/Blockchain')
const router = express.Router()

router.get('/getBlockchain', async (req, res) => {
    const blockchain = await getBlockchain();
    res.json(blockchain);
})

router.get('/getBlockByHash/:hash', async (req, res) => {
    const block = await getBlockByHash(req.params.hash);
    res.json(block);
})

module.exports = router