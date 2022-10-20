const BlockChainDbHelper = require('../helpers/BlockchainDbHelper');
const blockChainDbHelper = new BlockChainDbHelper();

const AddTransaction = function(transaction) {
    blockChainDbHelper.AddTransaction(transaction);
}

const minerPendingTransactions = function(minerRewardAddress) {
    blockChainDbHelper.minerPendingTransactions(minerRewardAddress);
}

module.exports = {AddTransaction , minerPendingTransactions};