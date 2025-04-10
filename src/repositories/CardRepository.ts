import { Pool, ResultSetHeader } from 'mysql2/promise';
import { BaseRepository } from './BaseRepository';
import { Card } from '@/models/Card';

export class CardRepository extends BaseRepository<Card> {
  constructor(pool: Pool) {
    super(pool);
  }

  async findAll(): Promise<Card[]> {
    const [rows] = await this.pool.query('SELECT * FROM cards');
    return rows as Card[];
  }

  async findById(id: number): Promise<Card | null> {
    const [rows] = await this.pool.query('SELECT * FROM cards WHERE id = $1', [id]);
    return (rows as Card[])[0] || null;
  }

  async create(data: Partial<Card>): Promise<number> {
    const { front, back, notebookId } = data;
    const res = await this.pool.query<ResultSetHeader>(
      'INSERT INTO cards (front, back, notebook_id) VALUES (?, ?, ?)',
      [front, back, notebookId],
    );
    return res[0].insertId;
  }

  async update(id: number, data: Partial<Card>): Promise<boolean> {
    const { front, back } = data;
    const [result] = await this.pool.query<ResultSetHeader>(
      'UPDATE cards SET front = $1, back = $2 WHERE id = $3',
      [front, back, id],
    );
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await this.pool.query<ResultSetHeader>('DELETE FROM cards WHERE id = $1', [
      id,
    ]);
    return result.affectedRows > 0;
  }

  async getLowestPriority(limit: number): Promise<Card[] | null> {
    const [result] = await this.pool.query(
      `SELECT id, front, back FROM cards
         ORDER BY priority ASC
         LIMIT ?`,
      [limit],
    );
    return (result as Card[]) || null;
  }

  async updatePriority(cardId: number, increment: number) {
    await this.pool.query(`UPDATE cards SET priority = COALESCE(priority, 0) + ? WHERE id = ?`, [
      increment,
      cardId,
    ]);
  }
}
