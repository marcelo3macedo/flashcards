import { BaseRepository } from '@/repositories/BaseRepository';

type TestEntity = { id: number; name: string };

class TestRepository extends BaseRepository<TestEntity> {
  async findById(id: number): Promise<TestEntity | null> {
    return { id, name: 'Mock' };
  }

  async findAll(): Promise<TestEntity[]> {
    return [{ id: 1, name: 'Mock' }];
  }

  async create(data: Partial<TestEntity>): Promise<number> {
    return 1;
  }

  async update(id: number, data: Partial<TestEntity>): Promise<boolean> {
    return true;
  }

  async delete(id: number): Promise<boolean> {
    return true;
  }
}

describe('BaseRepository (TestRepository)', () => {
  const pool = {} as unknown as Pool; // mock pool
  const repo = new TestRepository(pool);

  it('should create a record', async () => {
    const id = await repo.create({ name: 'Sample' });
    expect(id).toBe(1);
  });

  it('should find a record by id', async () => {
    const entity = await repo.findById(1);
    expect(entity).toEqual({ id: 1, name: 'Mock' });
  });

  it('should find all records', async () => {
    const all = await repo.findAll();
    expect(all).toEqual([{ id: 1, name: 'Mock' }]);
  });

  it('should update a record', async () => {
    const result = await repo.update(1, { name: 'Updated' });
    expect(result).toBe(true);
  });

  it('should delete a record', async () => {
    const result = await repo.delete(1);
    expect(result).toBe(true);
  });
});
