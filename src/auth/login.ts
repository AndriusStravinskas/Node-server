import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';
import bcrypt from 'bcrypt';
import UserModel from './model';
import { CredentialPartial, AuthSuccessResponse } from './type';
import credentialValidationSchema from './validation-schemas/credentials-validation-schema';
import { createAuthSuccessResponse } from './helpers';

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
    const user = await UserModel.getUser(credentials.email);

    const validPassword = await bcrypt.compare(credentials.password, user.password);

    if (!validPassword) throw new Error('incorect password');

     const authResponse = createAuthSuccessResponse(user);

    res.status(200).json(authResponse);
  } catch (error) {
    const [status, errorResponse] = ErrorService.handleError(error);
    res.status(status).json(errorResponse);
  }
};
