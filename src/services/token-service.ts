import config from 'config';
import jwt from 'jsonwebtoken';

// užslaptintas/užšifruotas - hashed
type HashedData = {
  email: UserEntity['email'],
  role: UserEntity['role']
};

const create = (data: HashedData) => jwt.sign(data, config.secret.jwtTokenKey);

const decode = (token: string): HashedData => jwt.decode(token) as HashedData;

const tokenService = {
  create,
  decode,
} as const;

export default tokenService;
