import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ForgetPasswordModel from './ForgetPasswordModel';
import { useDispatch} from 'react-redux';
import { login } from '../Store/AuthSlice';
const Login: React.FC = () => {
    interface IloginInformation {
        email: String;
        password: String;
    }
    const dispatch = useDispatch();
    const [loginInformation, setLoginInformation] = useState<IloginInformation>({
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLoginInformation({
            ...loginInformation,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (): Promise<void> => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, loginInformation);
            const token = response.data.token;
            dispatch(login(token))
            navigate('/home');
            toast.success(response.data.message);
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.error);
            }
        }
    };
    return (
        <>
            <div className='container col-md-4 col-sm-8 col-12 m-3 p-3 mx-auto p-5'>
                <div className='card'>
                    <form>
                        <div className='card-header text-center'>
                            <h2>Login</h2>
                        </div>
                        <div className='card-body'>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" className="form-control" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" className="form-control" onChange={handleChange} />
                            </div>
                            <div className="mb-3 d-flex justify-content-between">
                                <div className="text-end ">
                                    <ForgetPasswordModel />
                                </div>
                            </div>
                            <div className='text-end'>
                                <button type="button" className="btn btn-primary btn-block mb-3" onClick={handleSubmit}>Sign in</button>
                            </div>
                            <p className="text-center">Not a member? <a href="/registration">Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
