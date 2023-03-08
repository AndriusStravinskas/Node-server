import { AuthSuccessResponse } from 'auth/type';
import tokenService from '../../services/token-service';

export const createAuthSuccessResponse = ({
  password,
  ...user
}: UserEntity): AuthSuccessResponse => {
  const token = tokenService.create({ email: user.email, role: user.role });

  return {
    token,
    user,
  };
};
