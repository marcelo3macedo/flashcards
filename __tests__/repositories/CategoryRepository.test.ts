import { CategoryRepository } from '@/repositories/CategoryRepository';
import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Category } from '@/models/Category';

describe('CategoryRepository', () => {
  let mockPool: jest.Mocked<Pool>;
  let repo: CategoryRepository;

  beforeEach(() => {
    mockPool = {
      query: jest.fn(),
    } as unknown as jest.Mocked<Pool>;

    repo = new CategoryRepository(mockPool);
  });

  it('should find category by ID', async () => {
    const mockData: Category[] = [{ id: 1, name: 'Science', description: null }];
    mockPool.query = jest.fn().mockResolvedValueOnce([mockData]);

    const result = await repo.findById(1);

    expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM categories WHERE id = ?', [1]);
    expect(result).toEqual(mockData[0]);
  });

  it('should return null when category by ID not found', async () => {
    mockPool.query = jest.fn().mockResolvedValueOnce([[]]);

    const result = await repo.findById(999);
    expect(result).toBeNull();
  });

  it('should find all categories', async () => {
    const mockData: Category[] = [
      { id: 1, name: 'Math', description: null },
      { id: 2, name: 'History', description: null },
    ];

    mockPool.query = jest.fn().mockResolvedValueOnce([mockData]);

    const result = await repo.findAll();

    expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM categories');
    expect(result).toEqual(mockData);
  });

  it('should find categories by name (LIKE)', async () => {
    const mockData = [{ id: 1, name: 'Science', description: null }];
    mockPool.query = jest.fn().mockResolvedValueOnce([mockData]);

    const result = await repo.findByName('Sci');

    expect(mockPool.query).toHaveBeenCalledWith(
      `SELECT * FROM categories WHERE name LIKE CONCAT('%', ?, '%')`,
      ['Sci'],
    );
    expect(result).toEqual(mockData);
  });

  it('should create a category and return insertId', async () => {
    const mockResult = [{ insertId: 42 }] as unknown as [ResultSetHeader, any];

    mockPool.query = jest.fn().mockResolvedValueOnce(mockResult);

    const result = await repo.create({ name: 'New Category', description: 'test' });

    expect(mockPool.query).toHaveBeenCalledWith(
      'INSERT INTO categories (name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
      ['New Category', 'test'],
    );

    expect(result).toBe(42);
  });

  it('should update a category and return true if affected', async () => {
    const mockResult = [{ affectedRows: 1 }] as unknown as [ResultSetHeader, any];
    mockPool.query = jest.fn().mockResolvedValueOnce(mockResult);

    const result = await repo.update(1, { name: 'Updated', description: 'New desc' });

    expect(result).toBe(true);
  });

  it('should return false when update affects no rows', async () => {
    const mockResult = [{ affectedRows: 0 }] as unknown as [ResultSetHeader, any];
    mockPool.query = jest.fn().mockResolvedValueOnce(mockResult);

    const result = await repo.update(123, { name: 'Updated' });

    expect(result).toBe(false);
  });

  it('should delete a category and return true if affected', async () => {
    const mockResult = [{ affectedRows: 1 }] as unknown as [ResultSetHeader, any];
    mockPool.query = jest.fn().mockResolvedValueOnce(mockResult);

    const result = await repo.delete(1);
    expect(result).toBe(true);
  });

  it('should return false when delete affects no rows', async () => {
    const mockResult = [{ affectedRows: 0 }] as unknown as [ResultSetHeader, any];
    mockPool.query = jest.fn().mockResolvedValueOnce(mockResult);

    const result = await repo.delete(999);
    expect(result).toBe(false);
  });
});
