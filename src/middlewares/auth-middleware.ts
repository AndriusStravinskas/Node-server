import { RequestHandler } from 'express';
import ErrorService, { AuthorizationError } from 'services/error-service';
import tokenService from '../services/token-service';

const authMiddleware: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (authorization === undefined) throw new AuthorizationError();

      const token = authorization.split(' ')[1];
    if (token === undefined) throw new AuthorizationError();

    const authData = tokenService.decode(token);
    if (authData === null) throw new AuthorizationError();

    req.authData = authData;
    next();
  } catch (error) {
    const [status, errorResponse] = ErrorService.handleError(error);
    res.status(status).json(errorResponse);
  }
};

export default authMiddleware;
