import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './registration.css';
import { TextField, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';

export default function Registrationpage({ setStudentlogin }) {
  const [page, setPage] = useState(0);
  const [Registrationinfo, setRegistrationinfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const handlechange = (event) => {
    const { name, value } = event.target;
    setRegistrationinfo({ ...Registrationinfo, [name]: value });
  };

  const navigate = useNavigate();

  const onsubmit = async (event) => {
    event.preventDefault();
    try {
      const { username, email, password, confirmpassword } = Registrationinfo;
      const user = await axios.post('http://localhost:8082/users/register', {
        username,
        email,
        password,
        confirmpassword,
      });
      console.log(user);
      setPage(1);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const reggetform = () => {
    if (page === 0) {
      return (
        <div>
          <form className="register-form" id="register-form" onSubmit={onsubmit}>
            <div className="form-group">
              <TextField
                sx={{ width: '100%' }}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={Registrationinfo.username}
                onChange={handlechange}
                type="text"
                placeholder="Username"
                name="username"
                className="input_res"
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <TextField
                sx={{ width: '100%' }}
                id="outlined-basic"
                label="Kongu Email Id"
                variant="outlined"
                value={Registrationinfo.email}
                onChange={handlechange}
                type="text"
                placeholder="kongu Email ID"
                name="email"
                className="input_res"
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <TextField
                sx={{ width: '100%' }}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={Registrationinfo.password}
                onChange={handlechange}
                type="password"
                placeholder="Password"
                name="password"
                className="input_res"
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <TextField
                sx={{ width: '100%' }}
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                value={Registrationinfo.confirmpassword}
                onChange={handlechange}
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                className="input_res"
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group form-button">
              <input type="submit" name="signup" id="signup" className="form-submit reg" value="Create Account" />
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <Typography variant="body1" style={{ marginBottom: '10px' }}>
            Registration Successful!
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '10px' }}>
            Proceed to <Link to="#" className="signin-link" onClick={() => setStudentlogin(0)}>Login</Link>
          </Typography>
        </div>
      );
    }
  };

  return (
    <motion.div
      className="container otpform"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="signup-form">
        <h2 className="form-title reg-title">STAFF REGISTRATION</h2>
        {reggetform()}
      </div>
    </motion.div>
  );
}
