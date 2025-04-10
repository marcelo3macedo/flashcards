import type { NextApiRequest, NextApiResponse } from 'next';
import { handleGetUsers, handleCreateUser } from '../../../handlers/userHandlers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGetUsers(req, res);
    case 'POST':
      return handleCreateUser(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
