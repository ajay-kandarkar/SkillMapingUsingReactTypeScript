import { useNavigate } from "react-router-dom"

export default function ChangePasswordModel() {
    const navigate = useNavigate();
  return (
    <>
    <div className="container p-5 col-4">
      <div className="card">
    <h5 className="card-header">Change Password</h5>
     <div className="card-body">
     <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name ="password" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="confirmPassword" name ="confirmPassword" />
  </div>
  <button type="submit" className="btn btn-primary" onClick={()=>{navigate('/')}}>Submit</button>
</form>
    </div>
  </div>
  </div>
    </>
  )
}
