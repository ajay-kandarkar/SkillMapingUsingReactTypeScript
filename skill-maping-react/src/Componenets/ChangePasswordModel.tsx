import { toast } from "react-toastify";
import axios from "axios";
import { useFormik } from 'formik';
import { useLocation, useNavigate } from "react-router-dom";
import ValidationSchema from "./Validations/ValidationSchemaChangePassword";
export default function ChangePasswordModel() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tokenFromQuery = queryParams.get("token");
  const initialValues = {
    newPassword: '',
    token: '',
    confirmPassword: '',
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/change-password`, {
          newPassword: values.newPassword || '',
          token: tokenFromQuery || '',
        });
        toast.success(response.data.message);
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'An error occurred.');
      }
    },
  });

  const goToLogin = () => {
    navigate("/")
  }

  return (
    <>
      <div className="container p-5 col-4">
        <div className="card">
          <h5 className="card-header">Change Password</h5>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="newPassword" aria-describedby="emailHelp" onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword} />
                {formik.errors.newPassword && formik.touched.newPassword ? (
                  <p className="text-danger">
                    {formik.errors.newPassword}
                  </p>
                ) : null
                }
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword} />

                {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                  <p className="text-danger">
                    {formik.errors.confirmPassword}
                  </p>
                ) : null
                }
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              <button className="btn btn-primary m-2" onClick={goToLogin}>Back login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
