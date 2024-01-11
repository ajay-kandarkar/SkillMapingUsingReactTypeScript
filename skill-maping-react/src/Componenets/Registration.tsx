import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Registration: React.FC = () => {
    interface registrationInformation {
        firstname: String,
        lastname: String,
        phone: String,
        email: String,
        password: String
        ischecked: boolean,
    }
    const [registrationInfromation, setRegistrationInfromation] = useState<registrationInformation>({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        ischecked: false,
    });
    const [errors, setError] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        isChecked: "",
    });
    const navigate = useNavigate();
    const handleChangeCheckBox = () => {
        setRegistrationInfromation((prevRegisterInfo) => ({
            ...registrationInfromation,
            ischecked: !prevRegisterInfo.ischecked,
        }));

        setError((prevErrors:any) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors['isChecked'];
            return updatedErrors;
        });
    };
    const handleSubmit = () => {
        const validationErrors : any = {};
        if (!registrationInfromation.firstname.trim()) {
            validationErrors.firstname = 'First name is required';
        }
        if (!registrationInfromation.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registrationInfromation.email.trim())) {
            validationErrors.email = 'Invalid email adress';
        }
        if (!registrationInfromation.lastname) {
            validationErrors.lastname = 'Last name is required';
        }
        if (!registrationInfromation.phone.trim()) {
            validationErrors.phone = 'Mobile number is required';
        }
        if (!registrationInfromation.ischecked) {
            validationErrors.isChecked = 'You must agree to the Terms and Conditions';
        }
        if (!registrationInfromation.password) {
            validationErrors.password = 'Password is required';
        }
        console.log(Object.keys(validationErrors).length)
        setError(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/register`, {
            firstname: registrationInfromation.firstname || "",
            lastname: registrationInfromation.lastname || "",
            phone: registrationInfromation.phone || "",
            email: registrationInfromation.email || "",
            ischeck: registrationInfromation.ischecked || "",
            password: registrationInfromation.password || "",
        })
            .then((response) => {
                console.log('Patient details: ', response.data);
                 
            })
            .catch((error) => {
                console.error('Error inserting registration details', error);
            });
            navigate("/");
    }
    const handleInputChange = (fieldName: string, value: string) => {
        setRegistrationInfromation((prevRegistrationInfo) => ({
            ...prevRegistrationInfo,
            [fieldName]: value,
        }));
        switch (fieldName) {
            case 'firstname':
                setError((prevErrors:any) => {
                    if (value.trim()) {
                        const { firstname, ...restErrors } = prevErrors;
                        return { ...restErrors };
                    } else {
                        return { ...prevErrors, firstname: 'First name is required' };
                    }
                });
                break;
                case 'lastname':
                    setError((prevErrors:any) => {
                        if (value.trim()) {
                            const { lastname, ...restErrors } = prevErrors;
                            return { ...restErrors };
                        } else {
                            return { ...prevErrors, lastname: 'Last name is required' };
                        }
                    });
                    break;
                    case 'phone':
                        setError((prevErrors:any) => {
                            if (value.trim()) {
                                const { phone, ...restErrors } = prevErrors;
                                return { ...restErrors };
                            } else {
                                return { ...prevErrors, phone: ' Mobile number is required' };
                            }
                        });
                        break;
                        case 'email':
                        setError((prevErrors:any) => {
                            if (value.trim()) {
                                const { email, ...restErrors } = prevErrors;
                                return { ...restErrors };
                            } else {
                                return { ...prevErrors, email: 'Email is required' };
                            }
                        });
                        break;

                        case 'password':
                        setError((prevErrors:any) => {
                            if (value.trim()) {
                                const { password, ...restErrors } = prevErrors;
                                return { ...restErrors };
                            } else {
                                return { ...prevErrors, password: 'Password is required' };
                            }
                        });
                        break;
               default:
                  break;
        }
    };
    return (
        <>
            <div className='container col-md-4 col-sm-8 col-12 m-3 p-3 mx-auto p-5'>
                <div className='card'>
                    <form>
                        <div className='card-header text-center'>
                            <h4>Registration</h4>
                        </div>
                        <div className='card-body'>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="firstname">First Name<span style={{ color: "red" }}>*</span></label>
                                <input type="email" id="firstname" name="firstname" className="form-control" onChange={(e) => handleInputChange("firstname", e.target.value)} />
                                {errors.firstname && <p className="text-danger">{errors.firstname} </p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="lastname">Last Name<span style={{ color: "red" }}>*</span></label>
                                <input type="text" id="lastname" name="lastname" className="form-control"  onChange={(e) => handleInputChange("lastname", e.target.value)} />
                                {errors.lastname && <p className="text-danger">{errors.lastname} </p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="phone">Phone No<span style={{ color: "red" }}>*</span></label>
                                <input type="phone" id="phone" name="phone" className="form-control"  onChange={(e) => handleInputChange("phone", e.target.value)} />
                                {errors.phone && <p className="text-danger">{errors.phone} </p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email<span style={{ color: "red" }}>*</span></label>
                                <input type="email" id="email" name="email" className="form-control" onChange={(e) => handleInputChange("email", e.target.value)} />
                                {errors.email && <p className="text-danger">{errors.email} </p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="password">Password<span style={{ color: "red" }}>*</span></label>
                                <input type="password" id="password" name="password" className="form-control" onChange={(e) => handleInputChange("password", e.target.value)} />
                                {errors.password && <p className="text-danger">{errors.password} </p>}
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="isChecked" id="check" onChange={handleChangeCheckBox} />
                                    <label className="form-check-label" htmlFor="check">Accept All Term And Condition?<span style={{ color: "red" }}>*</span></label>
                                    {errors.isChecked && <p className="text-danger">{errors.isChecked} </p>}
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary btn-block mb-3" onClick={handleSubmit}>Register</button>
                            <p className="text-center">Already Register Sign in ? <a href="/">Sign in</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Registration
