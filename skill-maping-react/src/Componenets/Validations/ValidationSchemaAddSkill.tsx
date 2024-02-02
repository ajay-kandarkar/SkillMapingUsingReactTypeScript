import * as Yup from 'yup';
const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('skill  is required')
    .matches(/^[A-Za-z]+$/, 'skill should contain only characters'),
  description: Yup.string()
    .required('description is required')
    .min(10, 'Please enter a description atleast 10 chracter')
    .max(256, 'Please enter a description upto 256 chracter')
});
export default ValidationSchema;
