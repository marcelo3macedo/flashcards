import type { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '../../../services/UserService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const users = await userService.getAll();
      return res.status(200).json(users);
    }
    case 'POST': {
      const { externalId, name } = req.body;
      const id = await userService.create({ externalId, name });
      return res.status(201).json({ id });
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}