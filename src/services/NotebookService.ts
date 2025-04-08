import { NotebookRepository } from '../repositories/NotebookRepository';
import pool from '../db';

const notebookRepo = new NotebookRepository(pool);

export const notebookService = {
  getAll: () => notebookRepo.findAll(),
  getById: (id: number) => notebookRepo.findById(id),
  create: (data: any) => notebookRepo.create(data),
  update: (id: number, data: any) => notebookRepo.update(id, data),
  delete: (id: number) => notebookRepo.delete(id),
};