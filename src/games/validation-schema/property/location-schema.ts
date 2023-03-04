import * as yup from 'yup';

export const locationSchema = yup.object({
  country: yup.string().required().min(2, 'location.country must have at least 2 symbols').max(32, 'location.country cant have more than 32 symbols'),
  city: yup.string().required().min(2, 'location.city must have at least 2 symbols').max(32, 'location.city cant have more than 32 symbols'),
});
