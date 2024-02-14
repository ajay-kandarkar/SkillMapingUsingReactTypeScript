import { useNavigate } from "react-router-dom";
import { logout } from "../Store/AuthSlice";
import { useDispatch } from "react-redux";
import '../App.css';
export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(false))
    navigate('/');
    window.location.reload();
  };
  return (
    <>
      <button type="button" className="btn backgroundColor" data-bs-toggle="modal" data-bs-target="#logoutModal">
      Logout</button>
      <div className="modal fade" id="logoutModal" tabIndex={-1} aria-labelledby="logoutModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header backgroundColor">
              <h5 className="modal-title " id="logoutModalLabel">Logout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure want to logout ?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn cancelButton" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn backgroundColor" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
