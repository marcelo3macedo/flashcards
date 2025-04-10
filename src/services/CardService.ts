import { CardRepository } from '../repositories/CardRepository';
import pool from '../db';
import { Card } from '@/models/Card';

const cardRepo = new CardRepository(pool);

export const cardService = {
  getAll: () => cardRepo.findAll(),
  getById: (id: number) => cardRepo.findById(id),
  create: (data: Partial<Card>) => cardRepo.create(data),
  update: (id: number, data: Partial<Card>) => cardRepo.update(id, data),
  delete: (id: number) => cardRepo.delete(id),
};
