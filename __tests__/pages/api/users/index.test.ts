import handler from '@/pages/api/users/index'; // ajuste conforme sua estrutura
import { handleGetUsers, handleCreateUser } from '@/handlers/userHandlers';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/handlers/userHandlers');

const mockedHandleGetUsers = handleGetUsers as jest.Mock;
const mockedHandleCreateUser = handleCreateUser as jest.Mock;

describe('/api/users handler', () => {
  afterEach(() => jest.clearAllMocks());

  it('should call handleGetUsers on GET', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'GET' });

    await handler(req, res);

    expect(mockedHandleGetUsers).toHaveBeenCalledWith(req, res);
    expect(mockedHandleCreateUser).not.toHaveBeenCalled();
  });

  it('should call handleCreateUser on POST', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'POST' });

    await handler(req, res);

    expect(mockedHandleCreateUser).toHaveBeenCalledWith(req, res);
    expect(mockedHandleGetUsers).not.toHaveBeenCalled();
  });

  it('should return 405 for unsupported method', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'PUT' });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getData()).toBe('Method PUT Not Allowed');
    expect(res.getHeader('Allow')).toEqual(['GET', 'POST']);
  });
});
