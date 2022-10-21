const BlockChainDbHelper = require('../helpers/BlockchainDbHelper');
const blockChainDbHelper = new BlockChainDbHelper();

const getBalanceOfAddress = function(address) {
    var balance = blockChainDbHelper.getBalanceOfAddress(address);
    return balance;
}

module.exports = {getBalanceOfAddress};