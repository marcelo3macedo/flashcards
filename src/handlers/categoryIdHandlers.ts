import type { NextApiRequest, NextApiResponse } from 'next';
import { categoryService } from '../services/CategoryService';

export async function handleGetCategoryById(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  try {
    const category = await categoryService.getById(id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    return res.status(200).json(category);
  } catch (err) {
    console.error('Failed to fetch category:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleUpdateCategory(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  try {
    const updated = await categoryService.update(id, req.body);
    return res.status(updated ? 200 : 400).json({ success: updated });
  } catch (err) {
    console.error('Failed to update category:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleDeleteCategory(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  try {
    const deleted = await categoryService.delete(id);
    return res.status(deleted ? 200 : 400).json({ success: deleted });
  } catch (err) {
    console.error('Failed to delete category:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
