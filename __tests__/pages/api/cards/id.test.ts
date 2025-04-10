import handler from '@/pages/api/cards/[id]';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/handlers/cardHadlers', () => ({
  handleGetCardById: jest.fn((req, res) => res.status(200).json({ message: 'GET handler called' })),
  handleUpdateCard: jest.fn((req, res) => res.status(200).json({ message: 'PUT handler called' })),
  handleDeleteCard: jest.fn((req, res) =>
    res.status(200).json({ message: 'DELETE handler called' }),
  ),
}));

describe('/api/cards/[id] handler', () => {
  it('should call handleGetCardById for GET requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'GET' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'GET handler called' });
  });

  it('should call handleUpdateCard for PUT requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'PUT' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'PUT handler called' });
  });

  it('should call handleDeleteCard for DELETE requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'DELETE' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'DELETE handler called' });
  });

  it('should return 405 for unsupported methods', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'POST' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(405);
    expect(res._getData()).toContain('Method POST Not Allowed');
    expect(res.getHeader('Allow')).toEqual(['GET', 'PUT', 'DELETE']);
  });
});
