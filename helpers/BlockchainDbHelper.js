const BlockchainDB = require('../database/models/Blockchain');
const { Blockchain, Block, Transaction } = require('../src/blockchain')
const connectDatabase = require('../database/connectDatabase')



class BlockChainDbHelper {
    constructor() {
        connectDatabase();
        
    }

    GetBlockchain = async function () {
        const blockchain = await BlockchainDB.find();
        let RecycleCoin = new Blockchain(blockchain[0]["chain"], blockchain[0]["difficulty"], blockchain[0]["miningReward"], blockchain[0]["pendingTransactions"]);
        console.log(RecycleCoin);
        return RecycleCoin;
    }
    AddTransaction = async function (transaction) {
        RecycleCoin = await this.GetBlockchain();
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
        const blockchain = await this.GetBlockchain();
        blockchain.minePendingTransactions(minerRewardAddress);
        const newBlockchain = await BlockchainDB.updateOne({
            chain: blockchain.chain,
            difficulty: blockchain.difficulty,
            pendingTransactions: blockchain.pendingTransactions,
            miningReward: blockchain.miningReward
        })
    }
}

module.exports = BlockChainDbHelper;