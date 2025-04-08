import type { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '../../../services/UserService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  switch (req.method) {
    case 'GET': {
      const user = await userService.getById(id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      return res.status(200).json(user);
    }
    case 'PUT': {
      const updated = await userService.update(id, req.body);
      return res.status(updated ? 200 : 400).json({ success: updated });
    }
    case 'DELETE': {
      const deleted = await userService.delete(id);
      return res.status(deleted ? 200 : 400).json({ success: deleted });
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}