import type { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '../services/UserService';

export async function handleGetUserById(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

  try {
    const user = await userService.getById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
  } catch (err) {
    console.error('Failed to get user:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleUpdateUser(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

  try {
    const updated = await userService.update(id, req.body);
    return res.status(updated ? 200 : 400).json({ success: updated });
  } catch (err) {
    console.error('Failed to update user:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleDeleteUser(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

  try {
    const deleted = await userService.delete(id);
    return res.status(deleted ? 200 : 400).json({ success: deleted });
  } catch (err) {
    console.error('Failed to delete user:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
