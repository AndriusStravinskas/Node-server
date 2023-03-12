import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';
import bCryptService from 'services/bcrypt-service';
import UserModel from 'models/user-model';
import { CredentialPartial, AuthSuccessResponse } from '../type';
import credentialValidationSchema from '../validation-schemas/credentials-validation-schema';
import { createAuthSuccessResponse } from '../helpers/create-auth-success-response';

export const login: RequestHandler<
  {},
  AuthSuccessResponse | ResponseError,
  CredentialPartial,
  {}
> = async (req, res) => {
  try {
    const credentials = credentialValidationSchema.validateSync(req.body, { abortEarly: false });
    if (credentials.email === undefined) throw new Error('need a email');
    if (credentials.password === undefined) throw new Error('need a password');
    const user = await UserModel.getUserByEmail(credentials.email);

    const validPassword = bCryptService.compare(credentials.password, user.password);
    if (!validPassword) throw new Error('incorect password');

     const authResponse = createAuthSuccessResponse(user);
    res.status(200).json(authResponse);
  } catch (error) {
    const [status, errorResponse] = ErrorService.handleError(error);
    res.status(status).json(errorResponse);
  }
};
