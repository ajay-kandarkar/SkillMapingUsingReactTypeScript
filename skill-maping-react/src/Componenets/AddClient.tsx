import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ValidationSchema from './Validations/ValidationSchemaAddClient';

const AddClient = () => {
    
  interface Icountry {
    id: number;
    name: string;
  }

  interface Idomain {
    id: number;
    name: string;
  }

  const initialValues = {
    name: '',
    location: '',
    country_id: 0,
    domain_id: 0,
  }

  const [country, setCountry] = useState<Icountry[]>([]);
  const [domain, setDomain] = useState<Idomain[]>([]);

  const formik = useFormik({
    initialValues : initialValues,
    validationSchema: ValidationSchema,
    onSubmit: async (values,{resetForm}) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/add-client`, values);
        if(response)
        toast.success("Client Added Succesfully")
         resetForm();
      } catch (error:any) {
        if (error.response) {
          toast.error('Error occurred while adding client data');
        }
      }
    },
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/get-country`)
      .then((response) => {
        setCountry(response.data[0]);
      })
      .catch(() => {
        toast.error('Error occurred while fetching the country');
      });

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/get-domain`)
      .then((response) => {
        setDomain(response.data[0]);
      })
      .catch(() => {
        toast.error('Error occurred while fetching the domain');
      });
  }, []);

  return (
    <>
      <div>
        <button className="btn cancelButton" data-bs-toggle="modal"  onClick={() => formik.handleReset}  data-bs-target="#addClient">
          Add Client
        </button>
      </div>
      <div className="modal fade" id="addClient">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header backgroundColor">
              <h5 className="modal-title" id="addClientModelLabel">
                Add Client
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => formik.handleReset} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name <span className='text-danger'>*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location <span className='text-danger'>*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${formik.touched.location && formik.errors.location ? 'is-invalid' : ''}`}
                    id="location"
                    name="location"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.location}
                  />
                  {formik.touched.location && formik.errors.location && (
                    <div className="invalid-feedback">{formik.errors.location}</div>
                  )}
                </div>
                <div className="mb-3">
                  <span>Country</span>
                  <select
                    className={`form-select ${formik.touched.country_id && formik.errors.country_id ? 'is-invalid' : ''}`}
                    value={formik.values.country_id}
                    name="country_id"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option >Select Skill...</option>
                    {country && country.length > 0 ? (
                      country.map((item: Icountry) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    ) : (
                      <option>No data</option>
                    )}
                  </select>
                  {formik.touched.country_id && formik.errors.country_id && (
                    <div className="invalid-feedback">{formik.errors.country_id}</div>
                  )}
                </div>
                <div className="mb-3">
                  <span>Domain</span>
                  <select
                    className={`form-select ${formik.touched.domain_id && formik.errors.domain_id ? 'is-invalid' : ''}`}
                    value={formik.values.domain_id}
                    name="domain_id"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option>Select Domain...</option>
                    {domain && domain.length > 0 ? (
                      domain.map((item: Idomain) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    ) : (
                      <option>No data</option>
                    )}
                  </select>
                  {formik.touched.domain_id && formik.errors.domain_id && (
                    <div className="invalid-feedback">{formik.errors.domain_id}</div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn cancelButton" data-bs-dismiss="modal" onClick={formik.handleReset}>
                    Cancel
                  </button>
                  <button type="submit" className="btn backgroundColor"  data-bs-dismiss="modal" onClick={() => formik.handleSubmit} disabled={!(formik.isValid && formik.dirty)}>
                    Add Client
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClient;
