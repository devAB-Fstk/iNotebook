import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //API CALL TO DO
      const { name, email, password } = credentials;
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      console.log("clicked");
      if (json.success) {
        //save the authtiken and redirect
        localStorage.setItem('token', json.authToken)
        navigate('/');
        props.showAlert("Account created successfully", "success");
      } else {
        props.showAlert("Invalid Credentials", "danger");
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert('Failed to signup. Please try again.');
    }
  }
  //Use Event
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  };

  return (
    <div classsName="container">
      <h2 className='mt-4'>Create your account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">Enter Your Name</label>
          <input type="text" className="form-control" id="name" onChange={onChange} name='name' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name='password' minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onChange} name='cpassword' minLength={5} required />
        </div>
        <button type="submit" className="btn btn-dark">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
