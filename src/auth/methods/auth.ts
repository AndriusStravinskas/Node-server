import { RequestHandler } from 'express';
import ErrorService, { ServerSetupError } from 'services/error-service';
import UserModel from 'models/user-model';
import { AuthSuccessResponse } from '../type';
import { createAuthSuccessResponse } from '../helpers/create-auth-success-response';

export const refreshToken: RequestHandler<
  {},
  AuthSuccessResponse | ResponseError,
  {},
  {}
> = async (req, res) => {
  try {
    if (req.authData === undefined) throw new ServerSetupError();
    const user = await UserModel.getUserByEmail(req.authData.email);

     const authResponse = createAuthSuccessResponse(user);
    res.status(200).json(authResponse);
  } catch (error) {
    const [status, errorResponse] = ErrorService.handleError(error);
    res.status(status).json(errorResponse);
  }
};
