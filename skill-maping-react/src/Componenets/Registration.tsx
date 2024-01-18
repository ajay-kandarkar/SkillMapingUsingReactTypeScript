import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ValidationSchema from './ValidationSchema/ValidationSchema';
const Registration: React.FC = () => {
    interface IRegistrationInformation {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        password: string;
        isChecked: boolean;
        confirmPassword: string;
    }
    const [registrationInformation, setRegistrationInformation] = useState<IRegistrationInformation>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        isChecked: false,
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        isChecked: '',
        confirmPassword: '',
    });
    const handleChangeCheckBox = (): void => {
        setRegistrationInformation((prevRegisterInfo) => ({
            ...registrationInformation,
            isChecked: !prevRegisterInfo.isChecked,
        }));

        setErrors((prevErrors: any) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors['isChecked'];
            return updatedErrors;
        });
    };
    const handleSubmit = async (): Promise<void> => {
        try {
            await ValidationSchema.validate(registrationInformation, { abortEarly: false });

            axios.post(`${process.env.REACT_APP_BASE_URL}/register`, {
                firstName: registrationInformation.firstName || '',
                lastName: registrationInformation.lastName || '',
                phone: registrationInformation.phone || '',
                email: registrationInformation.email || '',
                isCheck: registrationInformation.isChecked || '',
                password: registrationInformation.password || '',
            })
                .then((response) => {
                    toast.success(response.data.message);
                })
                .catch(() => {
                    toast.error('User Already Registered!');
                });
        } catch (validationErrors: any) {
            const errors: any = {};
            validationErrors.inner.forEach((error: any) => {
                errors[error.path] = error.message;
            });

            setErrors(errors);
        }
    };
    const handleInputChange = (fieldName: string, value: string): void => {
        setRegistrationInformation((prevRegistrationInfo) => ({
            ...prevRegistrationInfo,
            [fieldName]: value,
        }));
        setErrors((prevErrors: any) => ({
            ...prevErrors,
            [fieldName]: '',
        }));
    };

    return (
        <>
            <div className="container col-md-4 col-sm-8 col-12 m-3 p-3 mx-auto p-5">
                <div className="card">
                    <form>
                        <div className="card-header text-center">
                            <h4>Registration</h4>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="firstName">
                                    First Name<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input type="text" id="firstName" name="firstName" className="form-control" onChange={(e) => handleInputChange('firstName', e.target.value)} />
                                {errors.firstName && <p className="text-danger">{errors.firstName} </p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="lastName">Last Name<span className='text-danger'>*</span></label>
                                <input type="text" id="lastname" name="lastName" className="form-control" onChange={(e) => handleInputChange("lastName", e.target.value)} />
                                {errors.lastName && <p className="text-danger">{errors.lastName} </p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="phone">Phone No<span className='text-danger'>*</span></label>
                                <input type="phone" id="phone" name="phone" className="form-control" onChange={(e) => handleInputChange("phone", e.target.value)} />
                                {errors.phone && <p className="text-danger">{errors.phone} </p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email<span className='text-danger'>*</span></label>
                                <input type="email" id="email" name="email" className="form-control" onChange={(e) => handleInputChange("email", e.target.value)} />
                                {errors.email && <p className="text-danger">{errors.email} </p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="password">Password<span className='text-danger'>*</span></label>
                                <input type="password" id="password" name="password" className="form-control" onChange={(e) => handleInputChange("password", e.target.value)} />
                                {errors.password && <p className="text-danger">{errors.password} </p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="ConfirmPassword">Confirm Password<span className='text-danger'>*</span></label>
                                <input type="password" id="password" name="confirmPassword" className="form-control" onChange={(e) => handleInputChange("confirmPassword", e.target.value)} />
                                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword} </p>}
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="isChecked" id="check" onChange={handleChangeCheckBox} />
                                    <label className="form-check-label" htmlFor="check">Accept All Term And Condition?<span className='text-danger'>*</span></label>
                                    {errors.isChecked && <p className="text-danger">{errors.isChecked} </p>}
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary btn-block mb-3" onClick={handleSubmit}>
                                Register
                            </button>
                            <p className="text-center">
                                Already Registered? <a href="/">Sign in</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Registration;
