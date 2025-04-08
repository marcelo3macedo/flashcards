import type { NextApiRequest, NextApiResponse } from 'next';
import { notebookService } from '../../../services/NotebookService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const notebooks = await notebookService.getAll();
      return res.status(200).json(notebooks);
    }
    case 'POST': {
      const { title, description, categoryId } = req.body;
      const id = await notebookService.create({ title, description, categoryId });
      return res.status(201).json({ id });
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}