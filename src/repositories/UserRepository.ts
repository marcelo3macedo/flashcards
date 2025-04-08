import { User } from '../models/User';
import { BaseRepository } from './BaseRepository';
import { Pool } from 'mysql2/promise';

export class UserRepository extends BaseRepository<User> {
  constructor(pool: Pool) {
    super(pool);
  }

  async findById(id: number): Promise<User | null> {
    const [rows] = await this.pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return (rows as User[])[0] || null;
  }

  async findByExternalId(externalId: string): Promise<User | null> {
    const [rows] = await this.pool.query('SELECT * FROM users WHERE external_id = ?', [externalId]);
    return (rows as User[])[0] || null;
  }

  async findAll(): Promise<User[]> {
    const [rows] = await this.pool.query('SELECT * FROM users');
    return rows as User[];
  }

  async create(data: Partial<User>): Promise<number> {
    const [result]: any = await this.pool.query(
      'INSERT INTO users (external_id, name, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
      [data.externalId, data.name || null]
    );
    return result.insertId;
  }

  async update(id: number, data: Partial<User>): Promise<boolean> {
    const [result]: any = await this.pool.query(
      'UPDATE users SET name = ?, updated_at = NOW() WHERE id = ?',
      [data.name || null, id]
    );
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result]: any = await this.pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}