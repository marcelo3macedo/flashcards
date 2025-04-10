import handler from '@/pages/api/notebooks'; // adjust if your path differs
import { handleGetNotebooks, handleCreateNotebook } from '@/handlers/notebookHandlers';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/handlers/notebookHandlers');

const mockHandleGetNotebooks = handleGetNotebooks as jest.Mock;
const mockHandleCreateNotebook = handleCreateNotebook as jest.Mock;

describe('/api/notebooks handler', () => {
  afterEach(() => jest.clearAllMocks());

  it('should call handleGetNotebooks on GET', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await handler(req, res);

    expect(mockHandleGetNotebooks).toHaveBeenCalledWith(req, res);
    expect(mockHandleCreateNotebook).not.toHaveBeenCalled();
  });

  it('should call handleCreateNotebook on POST', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { title: 'New Notebook' },
    });

    await handler(req, res);

    expect(mockHandleCreateNotebook).toHaveBeenCalledWith(req, res);
    expect(mockHandleGetNotebooks).not.toHaveBeenCalled();
  });

  it('should return 405 for unsupported method', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'PUT',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getData()).toBe('Method PUT Not Allowed');
    expect(res.getHeader('Allow')).toEqual(['GET', 'POST']);
  });
});
