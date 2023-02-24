import * as yup from 'yup';
import { GamesData } from '../types';
import { categorySchema } from './property/category-schema';
import conditionSchema from './property/condition-schema';
import { descriptionSchema } from './property/description-schema';
import imagesSchema from './property/images-schema';
import { locationSchema } from './property/location-schema';
import priceSchema from './property/price-schema';
import { titleSchema } from './property/title-schema';

const gameDataValidationSchema: yup.ObjectSchema<GamesData> = yup.object({
  title: titleSchema.required('title is required'),
  price: priceSchema(true),
  description: descriptionSchema.required('description is required'),
  category: categorySchema.required('category is required'),
  condition: conditionSchema.required('condition is required'),
  images: imagesSchema.required(),
  location: locationSchema.required('location is required'),
}).strict(true);

export default gameDataValidationSchema;
