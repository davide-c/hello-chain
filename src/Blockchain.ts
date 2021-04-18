import { IBlock } from './types/Block.interface';
import { IBlockchain } from './types/Blockchain.interface';
import { ITransaction } from './types/Transaction.interface';
import * as crypto from 'crypto';

export class Blockchain implements IBlockchain {
  protected chain: IBlock[];
  protected pendingTransactions: ITransaction[];

  public constructor() {
    this.chain = [];
    this.pendingTransactions = [];
  }

  public get(): IBlock[] {
    return this.chain;
  }

  public get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  public newBlock = (proof: any, previousHash?: string) => {
    const block: IBlock = {
      index: this.chain.length + 1,
      timestamp: new Date(),
      transaction: [...this.pendingTransactions],
      previousHash: previousHash || Blockchain.hash(this.lastBlock),
      proof,
    };

    this.pendingTransactions = [];
    this.chain = [...this.chain, block];

    return block;
  };

  public newTransaction = (
    sender: string,
    recipient: string,
    amount: number
  ) => {
    const transaction = {
      sender,
      recipient,
      amount,
    };

    this.pendingTransactions.push(transaction);

    return this.lastBlock ? this.lastBlock.index + 1 : 0;
  };

  public static hash(block: IBlock): string {
    const stringified = JSON.stringify(block);
    const encoded = encodeURI(stringified);
    return crypto.createHash('sha256').update(encoded).digest('hex');
  }
}
