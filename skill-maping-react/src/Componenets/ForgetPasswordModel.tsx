import { useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
export default function ForgetPasswordModel() {
  const [email, setEmail] = useState<String>()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handleSubmit = async (e: any): Promise<void> => {
    try {
      e.preventDefault();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/forget-password`, { email: email });
      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      }
    }
  };
  return (
    <>
      <a href="#" data-bs-toggle="modal" data-bs-target="#forgetPasswordBackdrop" >Forgot password?</a>
      <div className="modal fade" id="forgetPasswordBackdrop" aria-hidden="true">
        <div className="modal-dialog p-5">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="forgetPasswordBackdropLabel"> Forgot password</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <div className="text-start m-1">
                  <label htmlFor="email" className="form-label" >Email address</label>
                </div>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={handleChange} />
              </div>
              <input type='submit' className="btn btn-primary" value="Next" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}