import * as yup from 'yup';
import { GamesData } from './game-models';

const gameDataValidationSchema: yup.ObjectSchema<GamesData> = yup.object({
  title: yup.string().required('title is required').min(2, 'title must have at least 2 symbols').max(32, 'title cant have more than 32 symbols'),
  price: yup.number().required('price is required').positive('price must be positive')
  .test(
    'isPrice',
    'incorrect price format',
    (val: any) => Number(val.toFixed(2)) === val,
  ),
  description: yup.string().required('description is required').min(2, 'description must have at least 2 symbols'),
  category: yup.string().required('category is required').min(2, 'category must have at least 2 symbols').max(32, 'category cant have more than 32 symbols'),
  condition: yup.string().required('condition is required').min(2, 'condition must have at least 2 symbols').max(32, 'condition cant have more than 32 symbols'),
  images: yup.array(yup.string().required()).required().min(1, 'must have at least one image'),
  location: yup.object({
    country: yup.string().required('location.country is required').min(2, 'location.country must have at least 2 symbols').max(32, 'location.country cant have more than 32 symbols'),
    city: yup.string().required('location.city is required').min(2, 'location.city must have at least 2 symbols').max(32, 'location.city cant have more than 32 symbols'),
  }).required('location is required'),
}).strict(true);

export default gameDataValidationSchema;
