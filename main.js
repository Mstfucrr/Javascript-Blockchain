const { Blockchain, Block, Transaction } = require('./src/blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const connectDatabase = require('./database/connectDatabase')
const BlockchainDB = require('./database/models/Blockchain');

connectDatabase();

const myKey = ec.keyFromPrivate('e71ae3def584cb664c70b7890cbff57333e0667999be12661befbf38d4ca2846')
const myWalletAddress = myKey.getPublic('hex')



GetBlockchain = async function () {
    const blockchain = await BlockchainDB.find();
    let RecycleCoin = new Blockchain(blockchain[0]["chain"], blockchain[0]["difficulty"], blockchain[0]["miningReward"], blockchain[0]["pendingTransactions"]);
    console.log(RecycleCoin);
    return RecycleCoin;
}
AddTransaction = async function (transaction) {
    RecycleCoin = await GetBlockchain();
    RecycleCoin.addTransaction(transaction);
    const newBlockchain = await BlockchainDB.updateOne({
        chain: RecycleCoin.chain,
        difficulty: RecycleCoin.difficulty,
        pendingTransactions: RecycleCoin.pendingTransactions,
        miningReward: RecycleCoin.miningReward

    })
    console.log(newBlockchain);
}
minerPendingTransactions = async function (minerRewardAddress) {
    const blockchain = await GetBlockchain();
    blockchain.minePendingTransactions(minerRewardAddress);
    const newBlockchain = await BlockchainDB.updateOne({
        chain: blockchain.chain,
        difficulty: blockchain.difficulty,
        pendingTransactions: blockchain.pendingTransactions,
        miningReward: blockchain.miningReward
    })
}

// const tx1 = new Transaction(myWalletAddress, 'eeeee', 6666)
// tx1.signTransaction(myKey);
// AddTransaction(tx1);


minerPendingTransactions(myWalletAddress);