import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
export default function ForgetPasswordModel() {
const[email,setEmail] = useState<String>()
const navigate = useNavigate();
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setEmail(e.target.value);
     }

const handleSubmit = async (): Promise<void> => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}forget-password`, email);
        navigate('/');
        toast.success(response.data.message);
         console.log("I am call from response");
    } catch (error: any) {
        if (error.response) {
            toast.error(error.response.data.error);
        }
    }
};
  return (
    <>
 <a href="#" data-bs-toggle="modal"  data-bs-target="#staticBackdrop" >Forgot password?</a>
 <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
   <div className="modal-dialog p-5">
     <div className="modal-content">
       <div className="modal-header">
         <h5 className="modal-title" id="staticBackdropLabel"> Forget Password</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
    <div className="mb-3">
     <div className="text-start m-1">
    <label htmlFor="email" className="form-label" >Email address</label>
    </div>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={handleChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <input type='submit' className="btn btn-primary" value="Next" onClick={handleSubmit} />
      </div>
       
    </div>
  </div>
</div>
    </>
  )
}
