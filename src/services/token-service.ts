import config from 'config';
import jwt from 'jsonwebtoken';

// užslaptintas/užšifruotas - hashed

const create = (data: AuthData) => jwt.sign(data, config.jwtToken.secret, {
  expiresIn: config.jwtToken.expiresIn,
});

const decode = (token: string): DecodedAuthData | null => {
  const data = jwt.decode(token);

  if (data === null) return null;
  if (typeof data === 'string') return null;

  return {
    iat: data.iat as number,
    exp: data.exp as number,
    email: data.email,
  };
};

const tokenService = {
  create,
  decode,
};

export default tokenService;
