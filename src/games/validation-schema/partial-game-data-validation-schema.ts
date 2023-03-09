import * as yup from 'yup';
import { PartialGameBody } from '../types';
import { categorySchema } from './property/category-schema';
import conditionSchema from './property/condition-schema';
import { descriptionSchema } from './property/description-schema';
import imagesSchema from './property/images-schema';
import { locationSchema } from './property/location-schema';
import priceSchema from './property/price-schema';
import { titleSchema } from './property/title-schema';

const PartialGameDataValidationSchema: yup.ObjectSchema<PartialGameBody> = yup.object({
  title: titleSchema,
  price: priceSchema(),
  description: descriptionSchema,
  category: categorySchema,
  gameCondition: conditionSchema,
  images: imagesSchema,
  location: locationSchema,
}).strict(true);

export default PartialGameDataValidationSchema;
