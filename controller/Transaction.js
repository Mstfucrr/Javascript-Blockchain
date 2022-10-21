const BlockChainDbHelper = require('../helpers/BlockchainDbHelper');
const blockChainDbHelper = new BlockChainDbHelper();

const AddTransaction = function(transaction) {
    var newTransaction = JSON.parse(transaction);
    blockChainDbHelper.AddTransaction(newTransaction);
}

const minerPendingTransactions = function(minerRewardAddress) {
    blockChainDbHelper.minerPendingTransactions(minerRewardAddress);
}

module.exports = {AddTransaction , minerPendingTransactions};