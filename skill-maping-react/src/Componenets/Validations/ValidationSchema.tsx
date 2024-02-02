import * as Yup from 'yup';
const getCharacterValidationError = (charType: string) => {
  return `Your password must have at least 1 ${charType} character`;
};
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'Please enter a name that is between 2 and 10 characters in length')
    .max(10, 'Please enter a name that is between 2 and 10 characters in length')
    .matches(/^[A-Za-z]+$/, 'Last name should contain only characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Please enter a last name that is between 2 and 10 characters in length')
    .max(10, 'Please enter a last name that is between 2 and 10 characters in length')
    .matches(/^[A-Za-z]+$/, 'Last name should contain only characters'),
  phone: Yup.string()
    .required('Mobile number is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  isChecked: Yup.boolean().oneOf([true], 'You must agree to the Terms and Conditions'),
  password: Yup.string().required('Password is required')
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(/[!@#$%&*]/, getCharacterValidationError("special symbol")),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Password and confirm password should be the same'),
});
export default ValidationSchema;
