import * as yup from 'yup';
import { PartialGameData } from './game-models';

const PartialGameDataValidationSchema: yup.ObjectSchema<PartialGameData> = yup.object({
  title: yup.string().min(2, 'title must have at least 2 symbols').max(32, 'title cant have more than 32 symbols'),
  price: yup.number().positive('price must be positive')
  .test(
    'isPrice',
    'incorrect price format',
    (val) => {
      if (val === undefined) return true;
      return Number(val.toFixed(2)) === val;
},
  ),
  description: yup.string().min(2, 'description must have at least 2 symbols'),
  category: yup.string().min(2, 'category must have at least 2 symbols').max(32, 'category cant have more than 32 symbols'),
  condition: yup.string().min(2, 'condition must have at least 2 symbols').max(32, 'condition cant have more than 32 symbols'),
  images: yup.array(yup.string().required()).min(1, 'must have at least one image'),
  location: yup.object({
    country: yup.string().required().min(2, 'location.country must have at least 2 symbols').max(32, 'location.country cant have more than 32 symbols'),
    city: yup.string().required().min(2, 'location.city must have at least 2 symbols').max(32, 'location.city cant have more than 32 symbols'),
  }),
}).strict(true);

export default PartialGameDataValidationSchema;
