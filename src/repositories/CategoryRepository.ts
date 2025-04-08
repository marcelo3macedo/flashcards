import { Category } from '../models/Category';
import { BaseRepository } from './BaseRepository';
import { Pool } from 'mysql2/promise';

export class CategoryRepository extends BaseRepository<Category> {
  constructor(pool: Pool) {
    super(pool);
  }

  async findById(id: number): Promise<Category | null> {
    const [rows] = await this.pool.query('SELECT * FROM categories WHERE id = ?', [id]);
    return (rows as Category[])[0] || null;
  }

  async findAll(): Promise<Category[]> {
    const [rows] = await this.pool.query('SELECT * FROM categories');
    return rows as Category[];
  }

  async create(data: Partial<Category>): Promise<number> {
    const [result]: any = await this.pool.query(
      'INSERT INTO categories (name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
      [data.name, data.description || null]
    );
    return result.insertId;
  }

  async update(id: number, data: Partial<Category>): Promise<boolean> {
    const [result]: any = await this.pool.query(
      'UPDATE categories SET name = ?, description = ?, updated_at = NOW() WHERE id = ?',
      [data.name, data.description || null, id]
    );
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result]: any = await this.pool.query('DELETE FROM categories WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}
