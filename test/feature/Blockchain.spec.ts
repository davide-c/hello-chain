import { Blockchain } from '../../src/Blockchain';

describe('Blockchain', () => {
  it('should generate one block', () => {
    const bc = new Blockchain();

    bc.newTransaction('dc', 'co', 20);
    expect((bc as any).pendingTransactions.length).toBe(1);

    bc.newTransaction('co', 'dc', 10);
    expect((bc as any).pendingTransactions.length).toBe(2);

    bc.newBlock('First');

    expect((bc as any).pendingTransactions.length).toBe(0);

    expect((bc as any).chain).toEqual([
      {
        index: 1,
        previousHash:
          'eb045d78d273107348b0300c01d29b7552d622abbc6faf81b3ec55359aa9950c',
        proof: 'First',
        timestamp: bc.lastBlock.timestamp,
        transaction: [
          { amount: 20, recipient: 'co', sender: 'dc' },
          { amount: 10, recipient: 'dc', sender: 'co' },
        ],
      },
    ]);
  });

  it('should generate 2 blocks', () => {
    const bc = new Blockchain();

    bc.newTransaction('dc', 'co', 20);
    bc.newTransaction('co', 'dc', 10);

    bc.newBlock('First');

    bc.newTransaction('dc', 'co', 50);
    bc.newTransaction('co', 'dc', 70);

    bc.newBlock('Second');

    expect((bc as any).chain.length).toBe(2);

    const expectedHash = Blockchain.hash(bc.get()[0]);

    expect(bc.lastBlock.previousHash).toBe(expectedHash);

    const wrongHash = Blockchain.hash({
      index: 1,
      previousHash:
        'eb045d78d273107348b0300c01d29b7552d622abbc6faf81b3ec55359aa9950c',
      proof: 'Tampered', // <-- !
      timestamp: bc.get()[0].timestamp,
      transaction: [
        { amount: 20, recipient: 'co', sender: 'dc' },
        { amount: 10, recipient: 'dc', sender: 'co' },
      ],
    });

    expect(wrongHash).not.toBe(expectedHash);

    expect((bc as any).chain).toEqual([
      {
        index: 1,
        previousHash:
          'eb045d78d273107348b0300c01d29b7552d622abbc6faf81b3ec55359aa9950c',
        proof: 'First',
        timestamp: bc.get()[0].timestamp,
        transaction: [
          { amount: 20, recipient: 'co', sender: 'dc' },
          { amount: 10, recipient: 'dc', sender: 'co' },
        ],
      },
      {
        index: 2,
        timestamp: bc.lastBlock.timestamp,
        transaction: [
          { sender: 'dc', recipient: 'co', amount: 50 },
          { sender: 'co', recipient: 'dc', amount: 70 },
        ],
        proof: 'Second',
        previousHash: bc.get()[1].previousHash,
      },
    ]);
  });
});
