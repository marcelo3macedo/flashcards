import { Notebook } from '../models/Notebook';
import { BaseRepository } from './BaseRepository';
import { Pool } from 'mysql2/promise';

export class NotebookRepository extends BaseRepository<Notebook> {
  constructor(pool: Pool) {
    super(pool);
  }

  async findById(id: number): Promise<Notebook | null> {
    const [rows] = await this.pool.query('SELECT * FROM notebooks WHERE id = ?', [id]);
    return (rows as Notebook[])[0] || null;
  }

  async findAll(): Promise<Notebook[]> {
    const [rows] = await this.pool.query('SELECT * FROM notebooks');
    return rows as Notebook[];
  }

  async create(data: Partial<Notebook>): Promise<number> {
    const [result]: any = await this.pool.query(
      'INSERT INTO notebooks (title, description, category_id, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [data.title, data.description || null, data.categoryId]
    );
    return result.insertId;
  }

  async update(id: number, data: Partial<Notebook>): Promise<boolean> {
    const [result]: any = await this.pool.query(
      'UPDATE notebooks SET title = ?, description = ?, category_id = ?, updated_at = NOW() WHERE id = ?',
      [data.title, data.description || null, data.categoryId, id]
    );
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result]: any = await this.pool.query('DELETE FROM notebooks WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}