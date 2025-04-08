import type { NextApiRequest, NextApiResponse } from 'next';
import { categoryService } from '../../../services/CategoryService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  switch (req.method) {
    case 'GET': {
      const category = await categoryService.getById(id);
      if (!category) return res.status(404).json({ error: 'Category not found' });
      return res.status(200).json(category);
    }
    case 'PUT': {
      const updated = await categoryService.update(id, req.body);
      return res.status(updated ? 200 : 400).json({ success: updated });
    }
    case 'DELETE': {
      const deleted = await categoryService.delete(id);
      return res.status(deleted ? 200 : 400).json({ success: deleted });
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}