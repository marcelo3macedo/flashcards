import { Card } from '@/models/Card';
import { CardRepository } from '@/repositories/CardRepository';
import { Pool } from 'mysql2/promise';

const mockQuery = jest.fn();
const mockPool = {
  query: mockQuery,
} as unknown as Pool;

const cardRepository = new CardRepository(mockPool);

const mockCards: Card[] = [
  { id: 1, front: 'front1', back: 'back1', notebookId: 1, priority: 5 },
  { id: 2, front: 'front2', back: 'back2', notebookId: 1, priority: 10 },
];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('CardRepository', () => {
  it('findAll should return all cards', async () => {
    mockQuery.mockResolvedValueOnce([mockCards]);

    const result = await cardRepository.findAll();
    expect(result).toEqual(mockCards);
    expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM cards');
  });

  it('findById should return a card by id', async () => {
    mockQuery.mockResolvedValueOnce([[mockCards[0]]]);

    const result = await cardRepository.findById(1);
    expect(result).toEqual(mockCards[0]);
    expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM cards WHERE id = $1', [1]);
  });

  it('findById should return null if card not found', async () => {
    mockQuery.mockResolvedValueOnce([[]]);

    const result = await cardRepository.findById(999);
    expect(result).toBeNull();
  });

  it('create should insert a card and return the insertId', async () => {
    const data: Partial<Card> = { front: 'New', back: 'Card', notebookId: 2 };
    mockQuery.mockResolvedValueOnce([{ insertId: 42 }]);

    const result = await cardRepository.create(data);
    expect(result).toBe(42);
    expect(mockQuery).toHaveBeenCalledWith(
      'INSERT INTO cards (front, back, notebook_id) VALUES (?, ?, ?)',
      ['New', 'Card', 2],
    );
  });

  it('update should modify a card and return true if updated', async () => {
    mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }]);

    const result = await cardRepository.update(1, { front: 'Updated', back: 'Card' });
    expect(result).toBe(true);
    expect(mockQuery).toHaveBeenCalledWith('UPDATE cards SET front = $1, back = $2 WHERE id = $3', [
      'Updated',
      'Card',
      1,
    ]);
  });

  it('update should return false if no rows were affected', async () => {
    mockQuery.mockResolvedValueOnce([{ affectedRows: 0 }]);

    const result = await cardRepository.update(99, { front: 'No', back: 'Change' });
    expect(result).toBe(false);
  });

  it('delete should remove a card and return true if successful', async () => {
    mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }]);

    const result = await cardRepository.delete(1);
    expect(result).toBe(true);
    expect(mockQuery).toHaveBeenCalledWith('DELETE FROM cards WHERE id = $1', [1]);
  });

  it('getLowestPriority should return cards with lowest priority', async () => {
    mockQuery.mockResolvedValueOnce([mockCards]);

    const result = await cardRepository.getLowestPriority(2);
    expect(result).toEqual(mockCards);
    expect(mockQuery).toHaveBeenCalledWith(
      `SELECT id, front, back FROM cards
         ORDER BY priority ASC
         LIMIT ?`,
      [2],
    );
  });

  it('updatePriority should increment the priority of a card', async () => {
    mockQuery.mockResolvedValueOnce([]);

    await cardRepository.updatePriority(1, 3);
    expect(mockQuery).toHaveBeenCalledWith(
      'UPDATE cards SET priority = COALESCE(priority, 0) + ? WHERE id = ?',
      [3, 1],
    );
  });
});
