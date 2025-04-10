import type { NextApiRequest, NextApiResponse } from 'next';
import { handleGetCategories, handleCreateCategory } from '../../../handlers/categoryHandlers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGetCategories(req, res);
    case 'POST':
      return handleCreateCategory(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
