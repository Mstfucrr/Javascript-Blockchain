const { Blockchain, Transaction } = require('./src/blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const connectDatabase = require('./database/connectDatabase')
const BlockchainDB = require('./database/models/Blockchain');

connectDatabase();

const myKey = ec.keyFromPrivate('e71ae3def584cb664c70b7890cbff57333e0667999be12661befbf38d4ca2846')
const myWalletAddress = myKey.getPublic('hex')
let RecycleCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10)
tx1.signTransaction(myKey);
RecycleCoin.addTransaction(tx1);

const tx2 = new Transaction(myWalletAddress, 'public key goes here', 20)
tx2.signTransaction(myKey);
RecycleCoin.addTransaction(tx2);

const tx3 = new Transaction(myWalletAddress, 'public key goes here', 30)
tx3.signTransaction(myKey);
RecycleCoin.addTransaction(tx3);

console.log('\nStarting the miner...')
RecycleCoin.minePandingTransactions(myWalletAddress);
RecycleCoin.minePandingTransactions(myWalletAddress);

const tx4 = new Transaction(myWalletAddress, 'public key goes here', 40);
tx4.signTransaction(myKey);
RecycleCoin.addTransaction(tx4);

console.log('\n balance of my : ', RecycleCoin.getBalanceOfAddress(myWalletAddress));


console.log('is chain valid ?', RecycleCoin.isChainVaid())




const newBlockchain = async function () {

    const newBlockchain = await BlockchainDB.create({
        chain: RecycleCoin.chain,
        difficulty: RecycleCoin.difficulty,
        pendingTransactions: RecycleCoin.pendingTransactions,
        miningReward: RecycleCoin.miningReward  

    })
    console.log("new block chain is created..",newBlockchain)
}

newBlockchain();