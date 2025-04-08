import { Pool } from 'mysql2/promise';

export abstract class BaseRepository<T> {
  constructor(protected readonly pool: Pool) {}
  abstract findById(id: number): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract create(data: Partial<T>): Promise<number>;
  abstract update(id: number, data: Partial<T>): Promise<boolean>;
  abstract delete(id: number): Promise<boolean>;
}