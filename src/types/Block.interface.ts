export interface IBlock {
  index: number;
  timestamp: Date;
  transaction: any;
  proof: string;
  previousHash: string;
}
