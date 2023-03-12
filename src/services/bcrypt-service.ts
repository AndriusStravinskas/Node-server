import bcrypt from 'bcrypt';
import config from 'config';

const hash = (value: string) => bcrypt
.hashSync(value, config.passwordEcryption.bcryptRounds);

const compare = (value: string, hashedValue: string) => bcrypt.compareSync(value, hashedValue);

const bCryptService = {
  hash,
  compare,
};

export default bCryptService;
