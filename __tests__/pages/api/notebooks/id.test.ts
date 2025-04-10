import handler from '@/pages/api/notebooks/[id]';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/handlers/notebookIdHandlers', () => ({
  handleGetNotebookById: jest.fn((req, res) =>
    res.status(200).json({ message: 'GET handler called' }),
  ),
  handleUpdateNotebook: jest.fn((req, res) =>
    res.status(200).json({ message: 'PUT handler called' }),
  ),
  handleDeleteNotebook: jest.fn((req, res) =>
    res.status(200).json({ message: 'DELETE handler called' }),
  ),
}));

describe('/api/notebooks/[id] handler', () => {
  it('should call handleGetNotebookById for GET requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'GET' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'GET handler called' });
  });

  it('should call handleUpdateNotebook for PUT requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'PUT' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'PUT handler called' });
  });

  it('should call handleDeleteNotebook for DELETE requests', async () => {
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
