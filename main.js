const { Blockchain,Block, Transaction } = require('./src/blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const connectDatabase = require('./database/connectDatabase')
const BlockchainDB = require('./database/models/Blockchain');

connectDatabase();

const myKey = ec.keyFromPrivate('e71ae3def584cb664c70b7890cbff57333e0667999be12661befbf38d4ca2846')
const myWalletAddress = myKey.getPublic('hex')
let RecycleCoin = new Blockchain();





addTransaction = async function (transaction) {
    const blockchain = await BlockchainDB.find();
    var pendingTransactions = blockchain[0]["pendingTransactions"];
    var newTransaction = transaction;
    pendingTransactions.push(newTransaction);
    console.log("new transaction is added..", pendingTransactions)
    const newBlockchain = await BlockchainDB.updateOne({
        chain: blockchain[0]["chain"],
        difficulty: blockchain[0]["difficulty"],
        pendingTransactions: pendingTransactions,
        miningReward: blockchain[0]["miningReward"]
    })
}
// const tx1 = new Transaction(myWalletAddress, 'public key goes----', 120)
// tx1.signTransaction(myKey);


// addTransaction(tx1);

minerPendingTransactions = async function (minerRewardAddress) {
    const blockchain = await BlockchainDB.find();
    var pendingTransactions = blockchain[0]["pendingTransactions"];
    const rewardTx = new Transaction(null, minerRewardAddress, blockchain[0]["miningReward"]);
    pendingTransactions.push(rewardTx);
    const block = new Block(Date.now(), pendingTransactions, blockchain[0]["chain"].slice(-1)[0]["hash"])
    block.mineBlock(blockchain[0]["difficulty"]);
    blockchain[0]["chain"].push(block);
    console.log("Block successfully mined!")
    const newBlockchain = await BlockchainDB.updateOne({
        chain: blockchain[0]["chain"],
        difficulty: blockchain[0]["difficulty"],
        pendingTransactions: [],
        miningReward: blockchain[0]["miningReward"]
    })
}

// minerPendingTransactions(myWalletAddress);


// const newBlockchain = async function () {

//     const newBlockchain = await BlockchainDB.create({
//         chain: RecycleCoin.chain,
//         difficulty: RecycleCoin.difficulty,
//         pendingTransactions: RecycleCoin.pendingTransactions,
//         miningReward: RecycleCoin.miningReward

//     })
//     console.log("new block chain is created..", newBlockchain)
// }

// newBlockchain();