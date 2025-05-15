import { Theme } from '@/models/Theme';
import pool from '../db';
import { ThemeRepository } from '@/repositories/ThemeRepository';

const themeRepo = new ThemeRepository(pool);

export const themeService = {
  getAll: () => themeRepo.findAll(),
  create: (data: Partial<Theme>) => themeRepo.create(data),
};
