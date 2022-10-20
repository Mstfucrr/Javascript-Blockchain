const BlockchainDB = require('../database/models/Blockchain');
const { Blockchain, Block, Transaction } = require('../src/blockchain')



class BlockChainDbHelper {

    GetBlockchain = async function () {
        const blockchain = await BlockchainDB.find();
        let RecycleCoin = new Blockchain(blockchain[0]["chain"], blockchain[0]["difficulty"], blockchain[0]["miningReward"], blockchain[0]["pendingTransactions"]);
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
    getBlockByHash = async function (hash) {
        const blockchain = await this.GetBlockchain();
        return blockchain.chain.find(block => block.hash === hash);
    }
}

module.exports = BlockChainDbHelper;