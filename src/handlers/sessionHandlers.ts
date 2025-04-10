import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionService } from '../services/SessionService';

export async function handleCreateSession(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    const result = await sessionService.createSessionForUser(userId);
    return res.status(201).json(result);
  } catch (err) {
    console.error('Failed to create session:', err);
    return res.status(500).json({ error: 'Failed to create session' });
  }
}

export async function handleFinishSession(req: NextApiRequest, res: NextApiResponse) {
  const { sessionId, responses } = req.body;

  if (!sessionId || !responses) {
    return res.status(400).json({ error: 'Missing sessionId or responses' });
  }

  try {
    await sessionService.finishSession(sessionId, responses);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to update session:', err);
    return res.status(500).json({ error: 'Failed to update session' });
  }
}
