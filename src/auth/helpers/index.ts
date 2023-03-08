import { UserEntityRow, UserViewModel } from 'auth/type';
import tokenService from '../../services/token-service';

export const createAuthSuccessResponse = (user: UserEntityRow) => {
  const token = tokenService.create(user);
  const userViewModel: UserViewModel = {
    id: user.id,
    email: user.email,
    name: user.name,
    surname: user.surname,
    role: user.role,
  };

  return {
    token,
    user: userViewModel,
  };
};
