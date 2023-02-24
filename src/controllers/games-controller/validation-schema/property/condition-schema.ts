import * as yup from 'yup';

const conditionSchema = yup.string()
.min(2, 'condition must have at least 2 symbols')
.max(32, 'condition cant have more than 32 symbols');

export default conditionSchema;
