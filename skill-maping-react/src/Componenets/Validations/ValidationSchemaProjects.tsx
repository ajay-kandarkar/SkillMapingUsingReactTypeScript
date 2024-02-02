import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
    project_name: Yup.string()
    .required('Project name is required')
    .min(2, 'Please enter a name that is between 2 and 10 characters in length')
    .max(10, 'Please enter a name that is between 2 and 10 characters in length')
    .matches(/^[A-Za-z]+$/, 'Project name should contain only characters'),
    description: Yup.string()
    .required('Description is required')
    .matches(/^[A-Za-z]+$/, 'Last name should contain only characters'),
   phone: Yup.string()
    .required('Mobile number is required')
 
});
export default ValidationSchema;
