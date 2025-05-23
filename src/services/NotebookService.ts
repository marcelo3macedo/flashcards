import { NotebookRepository } from '../repositories/NotebookRepository';
import pool from '../db';
import { Notebook } from '@/models/Notebook';

const notebookRepo = new NotebookRepository(pool);

export const notebookService = {
  getAll: () => notebookRepo.findAll(),
  getById: (id: number) => notebookRepo.findById(id),
  create: (data: Partial<Notebook>) => notebookRepo.create(data),
  update: (id: number, data: Partial<Notebook>) => notebookRepo.update(id, data),
  delete: (id: number) => notebookRepo.delete(id),
  findByName: (title: string) => notebookRepo.findByTitle(title),
};
