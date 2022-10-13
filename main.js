const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const myKey = ec.keyFromPrivate('e71ae3def584cb664c70b7890cbff57333e0667999be12661befbf38d4ca2846')
const myWalletAddress = myKey.getPublic('hex')
const BlockChainDbHelper = require('./helpers/BlockchainDbHelper');
const blockChainDbHelper = new BlockChainDbHelper();

// const tx1 = new Transaction(myWalletAddress, 'eeeee', 6666)
// tx1.signTransaction(myKey);
// AddTransaction(tx1);
blockChainDbHelper.minerPendingTransactions(myWalletAddress);


