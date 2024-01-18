import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light p-0" >
        <Link to="/" className="navbar-brand">
          <img src="./Images/incubLogo.png" alt="" width="50" height="45" className="d-inline-block align-text-top" />
        </Link>
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button onClick={() => {
              navigate('/home');
            }} className="nav-link active text-dark" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button onClick={() => {
              navigate('/userInformation');
            }} className="nav-link text-dark" id="user-register-tab" data-bs-toggle="pill" data-bs-target="#user-register" type="button" role="tab" aria-controls="user-register" aria-selected="false">
              User information
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link text-dark" id="pills-logout-tab" data-bs-toggle="pill" data-bs-target="#pills-logout" type="button" role="tab" aria-controls="pills-logout" aria-selected="false" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <h5 className='p-2 text-info'>Home Content</h5>
        </div>
        <div className="tab-pane fade" id="user-register" role="tabpanel" aria-labelledby="user-register-tab">
          <h5 className='p-2 text-info'>Register User</h5>
        </div>

      </div>
    </div>
  );
};
export default Navbar;

