import type { NextApiRequest, NextApiResponse } from 'next';
import { themeService } from '@/services/ThemeService';

export async function handleGetTheme(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { group } = req.query;
    if (typeof group === 'string') {
      const themes = await themeService.findByGroup(group);
      return res.status(200).json(themes);
    }

    const themes = await themeService.getAll();
    return res.status(200).json(themes);
  } catch (err) {
    console.error('Failed to fetch themes:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleCreateTheme(req: NextApiRequest, res: NextApiResponse) {
  const { description, group } = req.body;

  try {
    const id = await themeService.create({ description, group });
    return res.status(201).json({ id });
  } catch (err) {
    console.error('Failed to create theme:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
