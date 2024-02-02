import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const RegistrationConfirm = () => {
  interface Ilogininfo {
    first_name: string,
    last_name: string
  }
  const [loginInfo, setLoginInfo] = useState<Ilogininfo>({
    first_name: "",
    last_name: "",
  });
  const { userId } = useParams();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/mail-verification/${userId}`)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
        else if (error.request) {
          toast.error(error.request.message);
        }
        else {
          toast.error('An error occurred while processing the request');
        }
      })
  }, [userId]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/get-login-user/${userId}`)
      .then((response) => {
        console.log(response.data)
        setLoginInfo(response.data);
      })
      .catch((error) => {
        toast.warning(error.response.message);
      })
  }, []);
  return (
    <div>
      <div className='container mx-auto m-5 p-5 col-5'>
        <div className='card'>
          <div className='card-header text-center'>
            <h6>WELCOME {loginInfo.first_name.toUpperCase()} {loginInfo.last_name.toUpperCase()}</h6>
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
