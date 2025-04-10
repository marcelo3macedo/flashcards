import type { NextApiRequest, NextApiResponse } from 'next';
import { handleCreateCard, handleGetCards } from '../../../handlers/cardHadlers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGetCards(req, res);
    case 'POST':
      return handleCreateCard(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
