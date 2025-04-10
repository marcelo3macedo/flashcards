import handler from '@/pages/api/categories/index';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/handlers/categoryHandlers', () => ({
  handleGetCategories: jest.fn((req, res) =>
    res.status(200).json({ message: 'GET handler called' }),
  ),
  handleCreateCategory: jest.fn((req, res) =>
    res.status(201).json({ message: 'POST handler called' }),
  ),
}));

describe('/api/categories handler', () => {
  it('should call handleGetCategories for GET requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'GET' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'GET handler called' });
  });

  it('should call handleCreateCategory for POST requests', async () => {
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
