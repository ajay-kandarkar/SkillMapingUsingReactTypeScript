import { useFormik } from 'formik';
import ValidationSchema from './Validations/ValidationSchema';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../App.css'
const Registration = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        isChecked: "",
        confirmPassword: '',
    };
    
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: ValidationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`http://localhost:8081/register`, {
                    firstName: values.firstName || '',
                    lastName: values.lastName || '',
                    phone: values.phone || '',
                    email: values.email || '',
                    isCheck: values.isChecked || '',
                    password: values.password || '',
                });
                toast.success(response.data.message);
            } catch (error: any) {
                console.error('Axios error:', error);
                toast.error(error.response?.data?.error || 'An error occurred.');
            }
        },
    });
    return (
        <>
            <div className="container col-md-4 col-sm-8 col-12 m-3 p-3 mx-auto p-5">
                <div className="card">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="card-header text-center backgroundColor">
                            <h4>Registration</h4>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="firstName">
                                    First Name
                                    <span className='text-danger'>*</span>
                                </label>
                                <input type="text" id="firstName"
                                    name="firstName"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstName}
                                />
                                {formik.errors.firstName && formik.touched.firstName ? (
                                    <p className="text-danger">
                                        {formik.errors.firstName}
                                    </p>
                                ) : null
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="lastName">
                                    Last Name
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastName"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastName}
                                />
                                {formik.errors.lastName && formik.touched.lastName ? (
                                    <p className="text-danger">
                                        {formik.errors.lastName}{' '}
                                    </p>
                                ) : null
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="phone">
                                    Phone No
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="phone"
                                    id="phone"
                                    name="phone"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                />
                                {formik.errors.phone && formik.touched.phone ? (
                                    <p className="text-danger">
                                        {formik.errors.phone}{' '}
                                    </p>
                                ) : null
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">
                                    Email
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.errors.email && formik.touched.email ? (
                                    <p className="text-danger">
                                        {formik.errors.email}{' '}
                                    </p>
                                ) : null
                                }
                            </div>
                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="password"
                                >
                                    Password
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                {formik.errors.password && formik.touched.password ? (
                                    <p className="text-danger">
                                        {formik.errors.password}
                                    </p>
                                ) : null
                                }
                            </div>
                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="confirmPassword"
                                >
                                    Confirm Password
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                />
                                {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                                    <p className="text-danger">
                                        {formik.errors.confirmPassword}
                                    </p>
                                ) : null
                                }
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="isChecked"
                                        id="check"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.isChecked}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="check"
                                    >
                                        Accept All Term And Condition?
                                        <span className="text-danger">*</span>
                                    </label>
                                    {formik.errors.isChecked && formik.touched.isChecked ? (
                                        <p className="text-danger">
                                            {formik.errors.isChecked}{' '}
                                        </p>
                                    ) : null
                                    }
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn backgroundColor btn-block mb-3"
                            >
                                Register
                            </button>
                            <p className="text-center">
                                Already Registered?{' '}
                                <a href="/">Sign in</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Registration;