import * as yup from 'yup';

export const titleSchema = yup.string()
.min(2, 'title must have at least 2 symbols')
.max(32, 'title cant have more than 32 symbols');
