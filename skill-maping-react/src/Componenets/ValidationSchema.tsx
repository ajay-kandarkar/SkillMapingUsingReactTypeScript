import * as Yup from 'yup';
const ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
     .min(2, 'Name should be between 2 and 10 characters')
     .max(10, 'Name should be between 2 and 10 characters')
     .matches(/^[A-Za-z]+$/, 'Last name should contain only characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name should be between 2 and 10 characters')
    .max(10, 'Last name should be between 2 and 10 characters')
    .matches(/^[A-Za-z]+$/, 'Last name should contain only characters'),
  phone: Yup.string()
    .required('Mobile number is required')
    .matches(/^\d{10}$/, 'Phone number should be exactly 10 digits'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  isChecked: Yup.boolean().oneOf([true], 'You must agree to the Terms and Conditions'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Password and confirm password should be the same'),
});
export default ValidationSchema;
