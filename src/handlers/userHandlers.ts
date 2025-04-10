import type { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '../services/UserService';

export async function handleGetUsers(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  try {
    if (typeof name === 'string') {
      const users = await userService.findByName(name);
      return res.status(200).json(users);
    } else {
      const users = await userService.getAll();
      return res.status(200).json(users);
    }
  } catch (err) {
    console.error('Failed to fetch users:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleCreateUser(req: NextApiRequest, res: NextApiResponse) {
  const { externalId, name } = req.body;

  try {
    const exists = await userService.findByExternalId(externalId);
    if (exists) {
      return res.status(200).json({ id: exists.id });
    }

    const id = await userService.create({ externalId, name });
    return res.status(201).json({ id });
  } catch (err) {
    console.error('Failed to create user:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
