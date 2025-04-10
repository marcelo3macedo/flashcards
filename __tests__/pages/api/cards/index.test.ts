import handler from '@/pages/api/cards/index';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/handlers/cardHadlers', () => ({
  handleGetCards: jest.fn((req, res) => res.status(200).json({ message: 'GET handler called' })),
  handleCreateCard: jest.fn((req, res) => res.status(201).json({ message: 'POST handler called' })),
}));

describe('/api/cards handler', () => {
  it('should call handleGetCards for GET requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'GET' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'GET handler called' });
  });

  it('should call handleCreateCard for POST requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'POST' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toEqual({ message: 'POST handler called' });
  });

  it('should return 405 for unsupported methods', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'DELETE' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(405);
    expect(res._getData()).toContain('Method DELETE Not Allowed');
    expect(res.getHeader('Allow')).toEqual(['GET', 'POST']);
  });
});
