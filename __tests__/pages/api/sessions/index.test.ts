import handler from '@/pages/api/sessions'; // adjust path as needed
import { handleCreateSession, handleFinishSession } from '@/handlers/sessionHandlers';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/handlers/sessionHandlers');

const mockHandleCreateSession = handleCreateSession as jest.Mock;
const mockHandleFinishSession = handleFinishSession as jest.Mock;

describe('/api/sessions handler', () => {
  afterEach(() => jest.clearAllMocks());

  it('should call handleCreateSession on POST', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
    });

    await handler(req, res);

    expect(mockHandleCreateSession).toHaveBeenCalledWith(req, res);
    expect(mockHandleFinishSession).not.toHaveBeenCalled();
  });

  it('should call handleFinishSession on PUT', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'PUT',
    });

    await handler(req, res);

    expect(mockHandleFinishSession).toHaveBeenCalledWith(req, res);
    expect(mockHandleCreateSession).not.toHaveBeenCalled();
  });

  it('should return 405 for unsupported methods', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getData()).toBe('Method GET Not Allowed');
    expect(res.getHeader('Allow')).toEqual(['POST', 'PUT']);
  });
});
