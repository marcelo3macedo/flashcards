import type { NextApiRequest, NextApiResponse } from 'next';
import {
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
} from '../../../handlers/userByIdHandlers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGetUserById(req, res);
    case 'PUT':
      return handleUpdateUser(req, res);
    case 'DELETE':
      return handleDeleteUser(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
