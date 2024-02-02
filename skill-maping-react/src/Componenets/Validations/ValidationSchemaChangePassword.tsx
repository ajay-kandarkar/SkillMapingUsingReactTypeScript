import * as Yup from 'yup';
const getCharacterValidationError = (charType: string) => {
  return `Your password must have at least 1 ${charType} character`;
};
const ValidationSchema = Yup.object().shape({
  newPassword: Yup.string().required('Password is required')
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(/[!@#$%&*]/, getCharacterValidationError("special symbol")),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword')], 'Password and confirm password should be the same'),
});
export default ValidationSchema;