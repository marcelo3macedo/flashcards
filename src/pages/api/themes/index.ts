import type { NextApiRequest, NextApiResponse } from 'next';
import { handleCreateTheme, handleGetTheme } from '@/handlers/themeHandlers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGetTheme(req, res);
    case 'POST':
      return handleCreateTheme(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
