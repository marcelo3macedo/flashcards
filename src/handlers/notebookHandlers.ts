import type { NextApiRequest, NextApiResponse } from 'next';
import { notebookService } from '../services/NotebookService';

export async function handleGetNotebooks(req: NextApiRequest, res: NextApiResponse) {
  const { title } = req.query;

  try {
    if (typeof title === 'string') {
      const notebooks = await notebookService.findByName(title);
      return res.status(200).json(notebooks);
    } else {
      const notebooks = await notebookService.getAll();
      return res.status(200).json(notebooks);
    }
  } catch (err) {
    console.error('Failed to fetch notebooks:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleCreateNotebook(req: NextApiRequest, res: NextApiResponse) {
  const { title, description, categoryId } = req.body;

  try {
    const id = await notebookService.create({ title, description, categoryId });
    return res.status(201).json({ id });
  } catch (err) {
    console.error('Failed to create notebook:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
