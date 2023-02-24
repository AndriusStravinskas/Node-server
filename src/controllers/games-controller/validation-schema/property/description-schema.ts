import * as yup from 'yup';

export const descriptionSchema = yup.string()
.min(2, 'description must have at least 2 symbols');
