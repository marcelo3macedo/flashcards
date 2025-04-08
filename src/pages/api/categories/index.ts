import type { NextApiRequest, NextApiResponse } from 'next';
import { categoryService } from '../../../services/CategoryService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const categories = await categoryService.getAll();
      return res.status(200).json(categories);
    }
    case 'POST': {
      const { name, description } = req.body;
      const id = await categoryService.create({ name, description });
      return res.status(201).json({ id });
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}