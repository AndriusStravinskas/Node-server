import config from 'config';
import jwt from 'jsonwebtoken';

// užslaptintas/užšifruotas - hashed
type Data = {
  email: UserEntity['email'],
  role: UserEntity['role']
};

type DecodedData = Data & { iat: number };

const create = (data: Data) => jwt.sign(data, config.secret.jwtTokenKey);

const decode = (token: string) => jwt.decode(token) as (DecodedData | null);

const tokenService = {
  create,
  decode,
};

export default tokenService;
