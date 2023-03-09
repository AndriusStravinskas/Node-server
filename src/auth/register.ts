import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';
import { createAuthSuccessResponse } from './helpers/create-auth-success-response';
import UserModel from './model';
import { AuthSuccessResponse, RegistrationBody } from './type';
import registrationDataValidationSchema from './validation-schemas/registration-data-validation-schema';

export const register: RequestHandler<
  {},
  AuthSuccessResponse | ResponseError,
  Partial<RegistrationBody>,
  {}
> = async (req, res) => {
  try {
    const { passwordConfirmation, ...registrationData } = registrationDataValidationSchema
    .validateSync(req.body, { abortEarly: false });

    const emailAvailable = await UserModel.emailAvailable(registrationData.email);
    if (!emailAvailable) throw new Error(`Email '${registrationData.email}' is already taken`);

    const newUser = await UserModel.createUser(registrationData);

    const authResponse = createAuthSuccessResponse(newUser);
    res.status(200).json(authResponse);
  } catch (error) {
    const [status, errorResponse] = ErrorService.handleError(error);
    res.status(status).json(errorResponse);
  }
};

/*
      1. Sukurti vartotoją
        * pradžioje išsibandome MySql Workbench'e
        * sukuriame modelio metodą - createUser
      2. Sukurti tokeną
        * sukurti atskirą service'ą kurti ir dekoduoti token'ui
        * aprašyti jame metodą - createToken
        * panaudoti jį tam, kad sukurti token'ą register/login metoduose
      3. išsiųsti duomenis - AuthSuccessResponse
        * sukuriame helper'į - createAuthSuccessResponse(user)
          * token'o sukūrimas perkelimas į funkcijos vidų
        * pritaikome createAuthSuccessResponse register/login metoduose
        * siunčiame duomenis naudodami <res> objektą
    */
