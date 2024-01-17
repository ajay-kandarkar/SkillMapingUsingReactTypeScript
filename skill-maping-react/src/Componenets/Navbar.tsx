import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (

    <> 
        <nav className="navbar navbar-expand-sm navbar-light p-0" style={{ backgroundColor: 'rgb(28 175 200)' }}>
      <Link to="/" className="navbar-brand">
        <img src=".\Images\incubLogo.png" alt="" width="50" height="45" className="d-inline-block align-text-top" />
      </Link>
      <ul className="nav nav-pills mb-3 navbar-light p-0" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <Link to="/home" className="nav-link active" role="tab" aria-controls="pills-home" aria-selected="true">
            <h5 className="text-black-50">Home</h5>
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link to="/userInformation" className="nav-link" role="tab" aria-controls="pills-userinformation" aria-selected="false">
            <h5 className="text-black-50">User Information</h5>
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" onClick={handleLogout} role="tab" aria-controls="pills-logout" aria-selected="false">
            <h5 className="text-black-50">Logout</h5>
          </button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">...</div>
        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
      </div>
    </nav>
            
    </>
          
  );
}

