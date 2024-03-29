const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
        this.TransactionisValid = Boolean
        this.timestamp = Date.now()
    }

    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }
    signTransaction(signingKey) {
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transaction for other wallets!');
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid() {
        if (this.fromAddress === null) return true;
        if (!this.signature || this.signature.length === 0) {
            throw new Error('No signature in this transaction');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();

    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }

    hasValidTransaction() {
        for (const tx of this.transactions) {
            var transaction = new Transaction(tx.fromAddress, tx.toAddress, tx.amount);
            transaction.TransactionisValid = tx.TransactionisValid;
            transaction.timestamp = tx.timestamp;
            transaction.signature = tx.signature;
            if (!transaction.isValid()) {
                return false;
            }
        }
        return true;
    }


}

class Blockchain {
    constructor(chain,difficulty,miningReward,pendingTransactions) {
        this.chain = chain;
        this.difficulty = difficulty;
        this.pendingTransactions = pendingTransactions;
        this.miningReward = miningReward;
        this.isChainValid = this.isChainValid();
    }
    createGenesisBlock() {
        return new Block(Date.parse("2017-01-01"), [], "0");
    }
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        rewardTx.TransactionisValid = true;
        rewardTx.timestamp = Date.now()
        this.pendingTransactions.push(rewardTx);
        let block = new Block(Date.now(), this.pendingTransactions, this.getLastBlock().hash)
        block.mineBlock(this.difficulty)

        console.log("Block successfully mined!")
        this.chain.push(block);

        this.pendingTransactions = [];

    }

    addTransaction(transaction) {
        this.pendingTransactions.push(transaction)
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error("Transaction must include from and to address")
        }

        if (!transaction.isValid()) {
            throw new Error("Cannot add invalid transaction to chain")
        }


    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        for (const pending of this.pendingTransactions) {
            if (pending.fromAddress === address) {
                balance -= pending.amount;
            }
            if (pending.toAddress === address) {
                balance += pending.amount;
            }
        }
        
        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            var cblock = new Block(currentBlock.timestamp, currentBlock.transactions, currentBlock.previousHash)
            cblock.hash = currentBlock.hash
            cblock.nonce = currentBlock.nonce
            const previousBlock = this.chain[i - 1];
            console.dir(currentBlock)
            if (!cblock.hasValidTransaction()) {
                return false;
            }

            if (cblock.hash !== cblock.calculateHash()) {
                return false;
            }
            if (cblock.previousHash !== cblock.hash) {
                return false
            }
        }
        return true;
    }
}

module.exports = { Transaction,Block, Blockchain }