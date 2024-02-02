
import * as Yup from 'yup';

const ValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  location: Yup.string().required('Location is required'),
  country_id: Yup.number().required('Country is required'),
  domain_id: Yup.number().required('Domain is required'),
});

export default ValidationSchema;
