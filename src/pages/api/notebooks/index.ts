import type { NextApiRequest, NextApiResponse } from 'next';
import { handleGetNotebooks, handleCreateNotebook } from '../../../handlers/notebookHandlers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGetNotebooks(req, res);
    case 'POST':
      return handleCreateNotebook(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
