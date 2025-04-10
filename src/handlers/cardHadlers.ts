import type { NextApiRequest, NextApiResponse } from 'next';
import { cardService } from '../services/CardService';

export async function handleGetCards(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cards = await cardService.getAll();
    return res.status(200).json(cards);
  } catch (err) {
    console.error('Failed to fetch cards:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleCreateCard(req: NextApiRequest, res: NextApiResponse) {
  const { front, back, notebookId } = req.body;

  try {
    const id = await cardService.create({ front, back, notebookId });
    return res.status(201).json({ id });
  } catch (err) {
    console.error('Failed to create card:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleGetCardById(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  try {
    const card = await cardService.getById(id);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    return res.status(200).json(card);
  } catch (err) {
    console.error('Failed to fetch card:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleUpdateCard(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  try {
    const updated = await cardService.update(id, req.body);
    return res.status(updated ? 200 : 400).json({ success: updated });
  } catch (err) {
    console.error('Failed to update card:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleDeleteCard(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  try {
    const deleted = await cardService.delete(id);
    return res.status(deleted ? 200 : 400).json({ success: deleted });
  } catch (err) {
    console.error('Failed to delete card:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
