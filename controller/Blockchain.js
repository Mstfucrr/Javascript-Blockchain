const BlockChainDbHelper = require('../helpers/BlockchainDbHelper');


const blockChainDbHelper = new BlockChainDbHelper();

const getBlockchain = function() {
    var blockchain = blockChainDbHelper.GetBlockchain();
    return blockchain;
}

const getBlockByHash = function(hash) {
    var block = blockChainDbHelper.getBlockByHash(hash);
    return block;
}

module.exports = {getBlockchain , getBlockByHash};