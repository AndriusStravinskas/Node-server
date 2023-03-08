import { RegistrationData } from 'auth/type';
import * as yup from 'yup';

const registrationDataValidationSchema: yup.ObjectSchema<RegistrationData> = yup.object({
  email: yup.string()
  .required('email is required')
  .email('incorrect email format'),

  emailConfirmation: yup.string()
  .required('email must be confirmed')
  .oneOf([yup.ref('email')], 'email must match'),

  name: yup.string()
  .required('name is required')
  .min(2, 'name must have at least 2 symbols')
  .max(32, 'name cant have more than 32 symbols'),

  surname: yup.string()
  .required('surname is required')
  .min(2, 'surname must have at least 2 symbols')
  .max(32, 'surname cant have more than 32 symbols'),

  password: yup.string()
  .required('password is required')
  .min(2, 'password must have at least 2 symbols')
  .max(32, 'password cant have more than 32 symbols')
  .matches(/[A-Z]{1}/, 'password must have at least one upper case letter')
  .matches(/[a-z]{1}/, 'password must have at least one lower case letter')
  .matches(/[0-9]{1}/, 'password must have at least one number')
  .matches(/[#?!@$%^&*-]{1}/, 'password must have at least special character'),

  passwordConfirmation: yup.string()
  .required('password must be confirmed')
  .when('password', (([password], schema) => {
    if (password) return schema.matches(new RegExp(password, 'g'), 'password must match');

    return schema;
  })),

}).strict(true);

export default registrationDataValidationSchema;

// .oneOf([yup.ref('password')], 'password must match')
