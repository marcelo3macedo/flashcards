import type { NextApiRequest, NextApiResponse } from 'next';
import { handleCreateSession, handleFinishSession } from '../../../handlers/sessionHandlers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return handleCreateSession(req, res);
    case 'PUT':
      return handleFinishSession(req, res);
    default:
      res.setHeader('Allow', ['POST', 'PUT']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
