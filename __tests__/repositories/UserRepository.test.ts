import { UserRepository } from '@/repositories/UserRepository';
import { Pool, ResultSetHeader } from 'mysql2/promise';
import { User } from '@/models/User';

describe('UserRepository', () => {
  let mockPool: jest.Mocked<Pool>;
  let repo: UserRepository;

  beforeEach(() => {
    mockPool = {
      query: jest.fn(),
    } as unknown as jest.Mocked<Pool>;

    repo = new UserRepository(mockPool);
  });

  it('should find user by ID', async () => {
    const mockUser: User = { id: 1, name: 'Alice', externalId: 'ext-1' };
    mockPool.query.mockResolvedValueOnce([[mockUser]]);

    const result = await repo.findById(1);

    expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE id = ?', [1]);
    expect(result).toEqual(mockUser);
  });

  it('should return null when user by ID not found', async () => {
    mockPool.query.mockResolvedValueOnce([[]]);

    const result = await repo.findById(999);
    expect(result).toBeNull();
  });

  it('should find user by external ID', async () => {
    const mockUser: User = { id: 2, name: 'Bob', externalId: 'ext-2' };
    mockPool.query.mockResolvedValueOnce([[mockUser]]);

    const result = await repo.findByExternalId('ext-2');

    expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE external_id = ?', [
      'ext-2',
    ]);
    expect(result).toEqual(mockUser);
  });

  it('should return null when user by external ID not found', async () => {
    mockPool.query.mockResolvedValueOnce([[]]);

    const result = await repo.findByExternalId('non-existent');
    expect(result).toBeNull();
  });

  it('should return all users', async () => {
    const mockUsers: User[] = [
      { id: 1, name: 'Alice', externalId: 'ext-1' },
      { id: 2, name: 'Bob', externalId: 'ext-2' },
    ];
    mockPool.query.mockResolvedValueOnce([mockUsers]);

    const result = await repo.findAll();

    expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM users');
    expect(result).toEqual(mockUsers);
  });

  it('should create a user and return insert ID', async () => {
    const mockResult = [{ insertId: 42 }] as unknown as [ResultSetHeader, any];
    mockPool.query.mockResolvedValueOnce(mockResult);

    const result = await repo.create({ name: 'Charlie', externalId: 'ext-3' });

    expect(mockPool.query).toHaveBeenCalledWith(
      'INSERT INTO users (external_id, name, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
      ['ext-3', 'Charlie'],
    );
    expect(result).toBe(42);
  });

  it('should update a user and return true if updated', async () => {
    const mockResult = [{ affectedRows: 1 }] as unknown as [ResultSetHeader, any];
    mockPool.query.mockResolvedValueOnce(mockResult);

    const result = await repo.update(1, { name: 'Updated Name' });

    expect(mockPool.query).toHaveBeenCalledWith(
      'UPDATE users SET name = ?, updated_at = NOW() WHERE id = ?',
      ['Updated Name', 1],
    );
    expect(result).toBe(true);
  });

  it('should return false if no user was updated', async () => {
    const mockResult = [{ affectedRows: 0 }] as unknown as [ResultSetHeader, any];
    mockPool.query.mockResolvedValueOnce(mockResult);

    const result = await repo.update(99, { name: 'No One' });

    expect(result).toBe(false);
  });

  it('should delete a user and return true if deleted', async () => {
    const mockResult = [{ affectedRows: 1 }] as unknown as [ResultSetHeader, any];
    mockPool.query.mockResolvedValueOnce(mockResult);

    const result = await repo.delete(2);

    expect(mockPool.query).toHaveBeenCalledWith('DELETE FROM users WHERE id = ?', [2]);
    expect(result).toBe(true);
  });

  it('should return false if no user was deleted', async () => {
    const mockResult = [{ affectedRows: 0 }] as unknown as [ResultSetHeader, any];
    mockPool.query.mockResolvedValueOnce(mockResult);

    const result = await repo.delete(99);

    expect(result).toBe(false);
  });

  it('should find users by name', async () => {
    const mockUsers: User[] = [
      { id: 1, name: 'Alice Wonderland', externalId: 'ext-alice' },
      { id: 2, name: 'Malice', externalId: 'ext-malice' },
    ];
    mockPool.query.mockResolvedValueOnce([mockUsers]);

    const result = await repo.findByName('lice');

    expect(mockPool.query).toHaveBeenCalledWith(
      `SELECT * FROM users WHERE name LIKE CONCAT('%', ?, '%')`,
      ['lice'],
    );
    expect(result).toEqual(mockUsers);
  });
});
