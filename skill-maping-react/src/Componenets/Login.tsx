import React, {useState,useEffect } from 'react';
import axios from 'axios';
const Login: React.FC = () => {
    interface logininformation {  
        email: String;  
        password: String;  
    } 
    const[loginInformation,setLoginInformation] = useState<logininformation>({
        email : "",
        password : "",
    })
    const [getLoginInformation,setGetloginInformation] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/get-login`)
        .then((response) => {
            setGetloginInformation(response.data);
        })
        .catch((error) => {
            console.error('Error fetching login details', error);
        })  
    }, []);
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
          setLoginInformation({
            ...loginInformation,
            [e.target.name]: e.target.value 
          })
    }
     const handleSubmit =() =>{  
         
    }
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
                                <label className="form-label" htmlFor="email">Email Address</label>
                                <input type="email" id="email" name="email" className="form-control" onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" className="form-control"onChange={handleChange}/>
                            </div>
                            <div className="mb-3 d-flex justify-content-between">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="check" checked />
                                    <label className="form-check-label" htmlFor="check">Remember me</label>
                                </div>
                                <div className="text-end d-none">
                                    <a href="#!">Forgot password?</a>
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
