import { CategoryRepository } from '../repositories/CategoryRepository';
import pool from '../db';
import { Category } from '@/models/Category';

const categoryRepo = new CategoryRepository(pool);

export const categoryService = {
  getAll: () => categoryRepo.findAll(),
  getById: (id: number) => categoryRepo.findById(id),
  create: (data: Partial<Category>) => categoryRepo.create(data),
  update: (id: number, data: Partial<Category>) => categoryRepo.update(id, data),
  delete: (id: number) => categoryRepo.delete(id),
  findByName: (name: string) => categoryRepo.findByName(name),
};
