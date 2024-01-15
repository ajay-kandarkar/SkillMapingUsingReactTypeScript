export default function Navbar() {
    

  return (
  <>
       <nav className="navbar navbar-expand-lg navbar-light p-0" style={{ backgroundColor: 'rgb(28 175 200)' }}>
     <a className="navbar-brand" href="#">
      <img src=".\Images\incubLogo.png" alt="" width="50" height="45" className="d-inline-block align-text-top"/>
    </a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/registration">Register</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/">Login</a>
      </li>
    </ul>
  </div>
     <form className="d-flex p-2">
    <div className="input-group mb-3">
  <input type="search"  className="form-control mr-sm-2" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
  <div className="input-group-append">
    <button className="btn btn-success" type="button">Search</button>
  </div>
</div>
    </form>
</nav>
  </>
  )
}

