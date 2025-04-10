import { UserRepository } from '../repositories/UserRepository';
import pool from '../db';
import { User } from '@/models/User';

const userRepo = new UserRepository(pool);

export const userService = {
  getAll: () => userRepo.findAll(),
  getById: (id: number) => userRepo.findById(id),
  findByExternalId: (externalId: string) => userRepo.findByExternalId(externalId),
  create: (data: Partial<User>) => userRepo.create(data),
  update: (id: number, data: Partial<User>) => userRepo.update(id, data),
  delete: (id: number) => userRepo.delete(id),
  findByName: (name: string) => userRepo.findByName(name),
};
