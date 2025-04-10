import type { NextApiRequest, NextApiResponse } from 'next';
import { categoryService } from '../services/CategoryService';

export async function handleGetCategories(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  try {
    if (typeof name === 'string') {
      const categories = await categoryService.findByName(name);
      return res.status(200).json(categories);
    } else {
      const categories = await categoryService.getAll();
      return res.status(200).json(categories);
    }
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleCreateCategory(req: NextApiRequest, res: NextApiResponse) {
  const { name, description } = req.body;

  try {
    const id = await categoryService.create({ name, description });
    return res.status(201).json({ id });
  } catch (err) {
    console.error('Failed to create category:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
