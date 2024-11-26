import React , {useEffect} from 'react';
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";

export default function Navbar() {

  const handleLogout = () =>{
    localStorage.removeItem('token')
    navigate('/login')
  }

  let location = useLocation();
  let navigate = useNavigate();
 

  // useEffect(() => {
  //   // Google Analytics
  //   // ga('send', 'pageview');
  //   console.log(location.pathname)
  // }, [location]);

  return (
      <nav className="navbar navbar-expand-lg  bg-dark text-white">
  <div className="container-fluid">
    <Link className="navbar-brand text-white" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link text-white ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
        <Link className={`nav-link text-white ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex" role="search">
      <Link className="btn btn-primary mx-2 " to="/login" role="button" aria-disabled="true">Login</Link>
      <Link className="btn btn-success mx-2 " to="/signup" role="button" aria-disabled="true">Signup</Link>
      </form> : <button onClick={handleLogout} className='btn btn-primary'>logout</button>}
    </div>
  </div>
</nav>
  )
}
