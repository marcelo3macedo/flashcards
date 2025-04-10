import type { NextApiRequest, NextApiResponse } from 'next';
import { notebookService } from '../services/NotebookService';

export async function handleGetNotebookById(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  try {
    const notebook = await notebookService.getById(id);
    if (!notebook) return res.status(404).json({ error: 'Notebook not found' });
    return res.status(200).json(notebook);
  } catch (err) {
    console.error('Failed to fetch notebook:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleUpdateNotebook(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  try {
    const updated = await notebookService.update(id, req.body);
    return res.status(updated ? 200 : 400).json({ success: updated });
  } catch (err) {
    console.error('Failed to update notebook:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleDeleteNotebook(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  try {
    const deleted = await notebookService.delete(id);
    return res.status(deleted ? 200 : 400).json({ success: deleted });
  } catch (err) {
    console.error('Failed to delete notebook:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
