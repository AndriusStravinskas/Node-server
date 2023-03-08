import { CredentialPartial } from 'auth/type';
import * as yup from 'yup';

const credentialValidationSchema: yup.ObjectSchema<CredentialPartial> = yup.object({
  email: yup.string()
  .required('email is required'),
  password: yup.string()
  .required('password is required'),
}).strict(true);

export default credentialValidationSchema;
