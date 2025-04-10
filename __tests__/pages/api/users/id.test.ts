import handler from '@/pages/api/users/[id]'; // ajuste esse path conforme sua estrutura
import { handleGetUserById, handleUpdateUser, handleDeleteUser } from '@/handlers/userByIdHandlers';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/handlers/userByIdHandlers');

const mockedHandleGetUserById = handleGetUserById as jest.Mock;
const mockedHandleUpdateUser = handleUpdateUser as jest.Mock;
const mockedHandleDeleteUser = handleDeleteUser as jest.Mock;

describe('/api/users/[id] handler', () => {
  afterEach(() => jest.clearAllMocks());

  it('should call handleGetUserById on GET', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await handler(req, res);

    expect(mockedHandleGetUserById).toHaveBeenCalledWith(req, res);
    expect(mockedHandleUpdateUser).not.toHaveBeenCalled();
    expect(mockedHandleDeleteUser).not.toHaveBeenCalled();
  });

  it('should call handleUpdateUser on PUT', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'PUT',
    });

    await handler(req, res);

    expect(mockedHandleUpdateUser).toHaveBeenCalledWith(req, res);
    expect(mockedHandleGetUserById).not.toHaveBeenCalled();
    expect(mockedHandleDeleteUser).not.toHaveBeenCalled();
  });

  it('should call handleDeleteUser on DELETE', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'DELETE',
    });

    await handler(req, res);

    expect(mockedHandleDeleteUser).toHaveBeenCalledWith(req, res);
    expect(mockedHandleGetUserById).not.toHaveBeenCalled();
    expect(mockedHandleUpdateUser).not.toHaveBeenCalled();
  });

  it('should return 405 for unsupported methods', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getData()).toBe('Method POST Not Allowed');
    expect(res.getHeader('Allow')).toEqual(['GET', 'PUT', 'DELETE']);
  });
});
