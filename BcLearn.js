const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
   
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
    
    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console/log("Block moned: " + this.hash);
    }
}


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "16/08/2021", "Genesis block", "0");
    } 

    getLastedBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
       newBlock.previousHash = this.getLastedBlock().hash;
       newBlock.mineBlock();
       this.chain.push(newBlock);
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
OthonnaCoin.addBlock(new Block(1, "20/08/2021", { amount: 4}));
OthonnaCoin.addBlock(new Block(2, "27/08/2021", { amount: 10}));

//console.log(JSON.stringify(OthonnaCoin, null, 4));
//console.log('Is blockchain valid ? ' + OthonnaCoin.isChainValid());

//OthonnaCoin.chain[1].data = { amount: 100};

//console.log('Is blockchain valid ? ' + OthonnaCoin.isChainValid());