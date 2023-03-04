import * as yup from 'yup';

export const categorySchema = yup.string()
.min(2, 'category must have at least 2 symbols')
.max(32, 'category cant have more than 32 symbols');
