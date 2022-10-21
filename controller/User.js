const BlockChainDbHelper = require('../helpers/BlockchainDbHelper');
const blockChainDbHelper = new BlockChainDbHelper();

const getBalanceOfAddress = function(address) {
    var balance = blockChainDbHelper.getBalanceOfAddress(address);
    return balance;
}

const getTransactionsOfAddress = function(address) {
    var transactions = blockChainDbHelper.getTransactionsOfAddress(address);
    return transactions;
}

module.exports = {getBalanceOfAddress ,getTransactionsOfAddress};