import type { NextApiRequest, NextApiResponse } from 'next';
import { themeService } from '@/services/ThemeService';

export async function handleGetTheme(req: NextApiRequest, res: NextApiResponse) {
  try {
    const themes = await themeService.getAll();
    return res.status(200).json(themes);
  } catch (err) {
    console.error('Failed to fetch themes:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleCreateTheme(req: NextApiRequest, res: NextApiResponse) {
  const { description } = req.body;

  try {
    const id = await themeService.create({ description });
    return res.status(201).json({ id });
  } catch (err) {
    console.error('Failed to create theme:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
