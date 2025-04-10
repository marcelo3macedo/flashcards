import pool from '../db';
import { Pool, ResultSetHeader } from 'mysql2/promise';

export class SessionRepository {
  private pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findActiveSessionByUserId(userId: number) {
    const [rows]: any = await pool.query(
      `SELECT * FROM sessions WHERE user_id = ? AND end_time IS NULL LIMIT 1`,
      [userId],
    );
    return rows[0] || null;
  }

  async getCardsBySessionId(sessionId: number) {
    const [rows]: any = await pool.query(
      `SELECT c.*
       FROM session_cards sc
       JOIN cards c ON sc.card_id = c.id
       WHERE sc.session_id = ?
         AND (sc.difficulty IS NULL OR sc.correct IS NULL)`,
      [sessionId],
    );
    return rows;
  }

  async create(userId: number) {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO sessions (user_id, status, created_at, updated_at)
       VALUES (?, 'active', NOW(), NOW())`,
      [userId],
    );
    return result.insertId;
  }

  async addCardToSession(sessionId: number, cardId: number) {
    await pool.query(
      `INSERT INTO session_cards (session_id, card_id)
       VALUES (?, ?)`,
      [sessionId, cardId],
    );
  }

  async finish(sessionId: number) {
    await pool.query(
      `UPDATE sessions SET status = 'completed', updated_at = NOW(), end_time = NOW() WHERE id = ?`,
      [sessionId],
    );
  }

  async storeCardResponse(
    sessionId: number,
    cardId: number,
    correct: boolean,
    difficulty?: string,
  ) {
    await pool.query(
      `UPDATE session_cards SET correct = ?, difficulty = ? WHERE session_id = ? AND card_id = ?`,
      [correct, difficulty, sessionId, cardId],
    );
  }

  async areAllCardsAnswered(sessionId: number) {
    const [rows]: any = await pool.query(
      `SELECT COUNT(*) AS unanswered
       FROM session_cards
       WHERE session_id = ? AND correct IS NULL`,
      [sessionId],
    );
    return Number(rows[0].unanswered) === 0;
  }
}
