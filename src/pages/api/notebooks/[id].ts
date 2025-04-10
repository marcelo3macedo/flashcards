import type { NextApiRequest, NextApiResponse } from 'next';
import {
  handleGetNotebookById,
  handleUpdateNotebook,
  handleDeleteNotebook,
} from '../../../handlers/notebookIdHandlers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGetNotebookById(req, res);
    case 'PUT':
      return handleUpdateNotebook(req, res);
    case 'DELETE':
      return handleDeleteNotebook(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
