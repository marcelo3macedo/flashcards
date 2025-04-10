import type { NextApiRequest, NextApiResponse } from 'next';
import {
  handleGetCategoryById,
  handleUpdateCategory,
  handleDeleteCategory,
} from '../../../handlers/categoryIdHandlers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGetCategoryById(req, res);
    case 'PUT':
      return handleUpdateCategory(req, res);
    case 'DELETE':
      return handleDeleteCategory(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
