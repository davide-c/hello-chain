import { IBlock } from './Block.interface';
import { ITransaction } from './Transaction.interface';

export interface IBlockchain {
  lastBlock: IBlock;
  newBlock: (proof: any, previousHash: string) => IBlock;
  newTransaction: (ender: string, recipient: string, amount: number) => number;
}
