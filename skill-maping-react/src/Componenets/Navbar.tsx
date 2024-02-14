import { Link, useNavigate } from 'react-router-dom';
import Logout from './LogoutModel';
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='d-flex justify-content-between shadow  mb-3 bg-white rounded"'>
      <div>
        <nav className="navbar navbar-expand-sm  p-0" >
          <Link to="/" className="navbar-brand ml-auto">
            <img src="./Images/incubLogo.png" alt="" width="50" height="45" className="d-inline-block align-text-top" />
          </Link>
          <ul className="nav nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item " role="presentation">
              <button onClick={() => {
                navigate('/home');
              }} className="nav-link active text-dark" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                Home
              </button>
            </li>
            <li className="nav-item ml-auto" role="presentation">
              <button onClick={() => {
                navigate('/userInformation');
              }} className="nav-link text-dark" id="user-register-tab" data-bs-toggle="pill" data-bs-target="#user-register" type="button" role="tab" aria-controls="user-register" aria-selected="false">
                User information
              </button>
            </li>
            <li className="nav-item ml-auto" role="presentation">
              <button onClick={() => {
                navigate('/listOfProjects');
              }} className="nav-link text-dark" id="project-tab" data-bs-toggle="pill" data-bs-target="#projects" type="button" role="tab" aria-controls="projects" aria-selected="false">
               Projects
              </button>
            </li>
            <li className="nav-item ml-auto" role="presentation">
              <button onClick={() => {
                navigate('/listOfClient');
              }} className="nav-link text-dark" id="clients-tab" data-bs-toggle="pill" data-bs-target="#clients" type="button" role="tab" aria-controls="projects" aria-selected="false">
               Clients
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
          <div className="tab-pane fade" id="projects" role="tabpanel" aria-labelledby="projects">
            <h5 className='p-2 text-info'>Projects</h5>
          </div> 
           <div className="tab-pane fade" id="clients" role="tabpanel" aria-labelledby="clients">
            <h5 className='p-2 text-info'>Clients</h5>
          </div>
        </div>
      </div>
      <div>
        <div className='p-2'>
          <Logout/>
        </div>
      </div>
    </div>
  );
}
export default Navbar;

