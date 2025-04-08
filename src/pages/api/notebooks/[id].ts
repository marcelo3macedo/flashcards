import type { NextApiRequest, NextApiResponse } from 'next';
import { notebookService } from '../../../services/NotebookService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  switch (req.method) {
    case 'GET': {
      const notebook = await notebookService.getById(id);
      if (!notebook) return res.status(404).json({ error: 'Notebook not found' });
      return res.status(200).json(notebook);
    }
    case 'PUT': {
      const updated = await notebookService.update(id, req.body);
      return res.status(updated ? 200 : 400).json({ success: updated });
    }
    case 'DELETE': {
      const deleted = await notebookService.delete(id);
      return res.status(deleted ? 200 : 400).json({ success: deleted });
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}