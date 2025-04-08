import { CategoryRepository } from '../repositories/CategoryRepository';
import pool from '../db';

const categoryRepo = new CategoryRepository(pool);

export const categoryService = {
  getAll: () => categoryRepo.findAll(),
  getById: (id: number) => categoryRepo.findById(id),
  create: (data: any) => categoryRepo.create(data),
  update: (id: number, data: any) => categoryRepo.update(id, data),
  delete: (id: number) => categoryRepo.delete(id),
};