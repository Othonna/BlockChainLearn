const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
   
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    
    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTranscactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block("16/08/2021", "Genesis block", "0");
    } 

    getLastedBlock() {
        return this.chain[this.chain.length - 1];
    }

   /*  addBlock(newBlock) {
       newBlock.previousHash = this.getLastedBlock().hash;
       newBlock.mineBlock(this.difficulty);
       this.chain.push(newBlock);
    }    */ 
    minePendingTranscactions(miningRewardAddress) {
        let block = new block(date.now(), this.pendingTranscactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined');
        this.chain.push(block);

        this.pendingTranscactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTranscactions.push(transaction);
    }

    getBalanceOfAdress(address) {
       let balance = 0;

       for(const block of this.chain) {
           for(const trans of block.transactions) {
               if(trans.fromAddress === address) {
                   balance -= trans.amount;
               }

               if(trans.toAddress === address) {
                balance += trans.amount;
            }
           }
       }
       return balance;
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let OthonnaCoin = new Blockchain();
OthonnaCoin.createTransaction(new Transaction('address1', 'address2', 100));
OthonnaCoin.createTransaction(new Transaction('address1', 'address2', 50));

console.log('\n Starting the miner...');
OthonnaCoin.minePendingTranscactions('janick-address');

console.log('\n Balance of janick', OthonnaCoin.getBalanceOfAdress('janick-address'));


/* console.log('Mining block 1... ')
OthonnaCoin.addBlock(new Block(1, "20/08/2021", { amount: 4}));

console.log('Mining block 2... ')
OthonnaCoin.addBlock(new Block(2, "27/08/2021", { amount: 10})); */

