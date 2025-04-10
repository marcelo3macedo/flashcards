import type { NextApiRequest, NextApiResponse } from 'next';
import {
  handleGetCardById,
  handleUpdateCard,
  handleDeleteCard,
} from '../../../handlers/cardHadlers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGetCardById(req, res);
    case 'PUT':
      return handleUpdateCard(req, res);
    case 'DELETE':
      return handleDeleteCard(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
