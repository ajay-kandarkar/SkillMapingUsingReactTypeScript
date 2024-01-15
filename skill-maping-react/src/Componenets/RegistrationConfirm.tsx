import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
const RegistrationConfirm = () => {
  const { userId } = useParams();
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/mail-verification/${userId}`)
      .then((response) => {
          console.log("information",response.data);
      })
      .catch((error) => {
          console.error('Error fetching login details', error);
      })   
    },[userId]);

  return (
    <div>
        <div className='container mx-auto m-5 p-5 col-5'>
            <div className='card'>
                <div className='card-header text-center'>
                <h6>Welcome you are succesfully Register!!!</h6>
                </div>
            <div className='card-body text-center'>
                   <a href='/'><h6>Click here to Login</h6></a>
            </div>
            </div>
        </div>
    </div>
  )
}

export default RegistrationConfirm
