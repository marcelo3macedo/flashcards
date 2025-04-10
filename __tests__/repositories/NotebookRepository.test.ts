import { NotebookRepository } from '@/repositories/NotebookRepository';
import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Notebook } from '@/models/Notebook';

describe('NotebookRepository', () => {
  let mockPool: jest.Mocked<Pool>;
  let repo: NotebookRepository;

  beforeEach(() => {
    mockPool = {
      query: jest.fn(),
    } as unknown as jest.Mocked<Pool>;

    repo = new NotebookRepository(mockPool);
  });

  it('should find notebook by ID', async () => {
    const mockData: Notebook[] = [{ id: 1, title: 'My Book', description: null, categoryId: 2 }];
    mockPool.query = jest.fn().mockResolvedValueOnce([mockData]);

    const result = await repo.findById(1);

    expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM notebooks WHERE id = ?', [1]);
    expect(result).toEqual(mockData[0]);
  });

  it('should return null if notebook is not found by ID', async () => {
    mockPool.query = jest.fn().mockResolvedValueOnce([[]]);

    const result = await repo.findById(999);
    expect(result).toBeNull();
  });

  it('should find all notebooks', async () => {
    const mockData: Notebook[] = [
      { id: 1, title: 'Math Notes', description: 'Algebra', categoryId: 1 },
      { id: 2, title: 'Science Notes', description: null, categoryId: 2 },
    ];

    mockPool.query = jest.fn().mockResolvedValueOnce([mockData]);

    const result = await repo.findAll();

    expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM notebooks');
    expect(result).toEqual(mockData);
  });

  it('should find notebooks by title', async () => {
    const mockData = [{ id: 1, title: 'Chemistry', description: null, categoryId: 3 }];
    mockPool.query = jest.fn().mockResolvedValueOnce([mockData]);

    const result = await repo.findByTitle('Chem');

    expect(mockPool.query).toHaveBeenCalledWith(
      `SELECT * FROM notebooks WHERE title LIKE CONCAT('%', ?, '%')`,
      ['Chem'],
    );

    expect(result).toEqual(mockData);
  });

  it('should create a notebook and return insertId', async () => {
    const mockResult = [{ insertId: 101 }] as unknown as [ResultSetHeader, any];

    mockPool.query = jest.fn().mockResolvedValueOnce(mockResult);

    const result = await repo.create({
      title: 'New Notebook',
      description: 'Some notes',
      categoryId: 5,
    });

    expect(mockPool.query).toHaveBeenCalledWith(
      'INSERT INTO notebooks (title, description, category_id, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      ['New Notebook', 'Some notes', 5],
    );

    expect(result).toBe(101);
  });

  it('should update a notebook and return true if affected', async () => {
    const mockResult = [{ affectedRows: 1 }] as unknown as [ResultSetHeader, any];
    mockPool.query = jest.fn().mockResolvedValueOnce(mockResult);

    const result = await repo.update(1, {
      title: 'Updated Title',
      description: 'Updated desc',
      categoryId: 2,
    });

    expect(mockPool.query).toHaveBeenCalledWith(
      'UPDATE notebooks SET title = ?, description = ?, category_id = ?, updated_at = NOW() WHERE id = ?',
      ['Updated Title', 'Updated desc', 2, 1],
    );

    expect(result).toBe(true);
  });

  it('should return false if notebook update affects no rows', async () => {
    const mockResult = [{ affectedRows: 0 }] as unknown as [ResultSetHeader, any];
    mockPool.query = jest.fn().mockResolvedValueOnce(mockResult);

    const result = await repo.update(99, {
      title: 'Updated Title',
      description: 'Desc',
      categoryId: 1,
    });

    expect(result).toBe(false);
  });

  it('should delete a notebook and return true if affected', async () => {
    const mockResult = [{ affectedRows: 1 }] as unknown as [ResultSetHeader, any];
    mockPool.query = jest.fn().mockResolvedValueOnce(mockResult);

    const result = await repo.delete(1);
    expect(result).toBe(true);
  });

  it('should return false if notebook delete affects no rows', async () => {
    const mockResult = [{ affectedRows: 0 }] as unknown as [ResultSetHeader, any];
    mockPool.query = jest.fn().mockResolvedValueOnce(mockResult);

    const result = await repo.delete(99);
    expect(result).toBe(false);
  });
});
