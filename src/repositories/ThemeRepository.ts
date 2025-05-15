import { Theme } from '@/models/Theme';
import { BaseRepository } from './BaseRepository';
import { Pool, ResultSetHeader } from 'mysql2/promise';

export class ThemeRepository extends BaseRepository<Theme> {
  constructor(pool: Pool) {
    super(pool);
  }

  async findById(id: number): Promise<Theme | null> {
    const [rows] = await this.pool.query('SELECT * FROM themes WHERE id = ?', [id]);
    return (rows as Theme[])[0] || null;
  }

  async findAll(): Promise<Theme[]> {
    const [rows] = await this.pool.query('SELECT * FROM themes');
    return rows as Theme[];
  }

  async create(data: Partial<Theme>): Promise<number> {
    const [result] = await this.pool.query<ResultSetHeader>(
      'INSERT INTO themes (description, created_at, updated_at) VALUES (?, NOW(), NOW())',
      [data.description || null],
    );
    return result.insertId;
  }

  async update(id: number, data: Partial<Theme>): Promise<boolean> {
    const [result] = await this.pool.query<ResultSetHeader>(
      'UPDATE themes SET description = ?, updated_at = NOW() WHERE id = ?',
      [data.description || null, id],
    );
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await this.pool.query<ResultSetHeader>('DELETE FROM themes WHERE id = ?', [
      id,
    ]);
    return result.affectedRows > 0;
  }
}
