const {Blockchain,Transaction} = require('./blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('e71ae3def584cb664c70b7890cbff57333e0667999be12661befbf38d4ca2846')
const myWalletAddress = myKey.getPublic('hex')
let RecycleCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress,'public key goes here',10)
tx1.signTransaction(myKey);
RecycleCoin.addTransaction(tx1);

console.log('\nStarting the miner...')
RecycleCoin.minePandingTransactions(myWalletAddress);

console.log('\n balance of my : ', RecycleCoin.getBalanceOfAddress(myWalletAddress));


console.log('is chain valid ?' ,RecycleCoin.isChainVaid())