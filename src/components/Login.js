import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    //using state
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //API CALL TO DO
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
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
                props.showAlert("Logged in Successfully", "success");
                navigate('/');
            } else {
                props.showAlert("Invalid Credentials, try again", "danger");
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('Failed to login. Please try again.');
        }
    }
    //Use Event
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className='mt-4'>Login to iNotebook</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email </label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-dark" >Login</button>
            </form>
        </div>
    )
}

export default Login
