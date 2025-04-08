import { UserRepository } from '../repositories/UserRepository';
import pool from '../db';

const userRepo = new UserRepository(pool);

export const userService = {
  getAll: () => userRepo.findAll(),
  getById: (id: number) => userRepo.findById(id),
  create: (data: any) => userRepo.create(data),
  update: (id: number, data: any) => userRepo.update(id, data),
  delete: (id: number) => userRepo.delete(id),
};