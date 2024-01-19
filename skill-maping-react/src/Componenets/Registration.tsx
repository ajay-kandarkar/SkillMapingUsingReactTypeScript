import { useFormik } from 'formik';
import ValidationSchema from './ValidationSchema/ValidationSchema';
import axios from 'axios';
import { toast } from 'react-toastify';
const Registration = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        isChecked: false,
        confirmPassword: '',
    };

    const {
        values,errors,touched,handleBlur,handleChange,handleSubmit,} = useFormik({
        initialValues: initialValues,
        validationSchema: ValidationSchema,
        onSubmit: (values) => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/register`, {
                firstName: values.firstName || '',
                lastName: values.lastName || '',
                phone: values.phone || '',
                email: values.email || '',
                isCheck: values.isChecked || '',
                password: values.password || '',
            })
                .then((response) => {
                    console.log(response)
                    toast.success(response.data.message);
                })
                .catch((error) => {
                    if (error.response) {
                        toast.error(error.response.data.error);
                    }
                });
        },
    });
    return (
        <>
            <div className="container col-md-4 col-sm-8 col-12 m-3 p-3 mx-auto p-5">
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <div className="card-header text-center">
                            <h4>Registration</h4>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="firstName">
                                    First Name
                                    <span style={{ color: 'red' }}>*</span>
                                </label>
                            <input type="text" id="firstName"
                                    name="firstName"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.firstName && touched.firstName ? (
                                    <p className="text-danger">
                                        {errors.firstName}
                                    </p>) : null
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.lastName && touched.lastName ? (
                                    <p className="text-danger">
                                        {errors.lastName}{' '}
                                    </p>) : null
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                 {errors.phone && touched.phone ? (
                                    <p className="text-danger">
                                        {errors.phone}
                                    </p>) : null
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.email &&  (
                                    <p className="text-danger">
                                        {errors.email}
                                    </p>
                                )
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password ? (
                                    <p className="text-danger">
                                        {errors.password}
                                    </p>
                                ):null
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <p className="text-danger">
                                        {errors.confirmPassword}
                                    </p>
                                ):null
                            }
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="isChecked"
                                        id="check"
                                        checked={values.isChecked}
                                        onChange={handleChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="check"
                                    >
                                        Accept All Term And Condition?
                                        <span className="text-danger">*</span>
                                    </label>
                                    {errors.isChecked && touched.isChecked ? (
                                        <p className="text-danger">
                                            {errors.isChecked}{' '}
                                        </p>
                                    ): null
                                }
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-block mb-3"
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