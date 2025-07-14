import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { Link, useNavigate } from 'react-router-dom';
import './registration.css';

export default function Loginpage({ setStudentlogin }) {
  const [_, setCookies] = useCookies(["access_token"]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post('https://kec-guest-house-booking-system.onrender.com/users/login', { email, password });
      setCookies("access_token", user.data.token);
      if (user.data.token) {
        navigate('/home');
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <motion.div className="container"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="signin-form">
        <h2 className="form-title">KONGU ENGINEERING COLLEGE STAFF</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <TextField sx={{ width: '100%' }} id="email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off' required placeholder='Enter your email' />
          </div>
          <div className="form-group">
            <TextField sx={{ width: '100%' }} id="password" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' autoComplete='off' required />
          </div>
          <div>
            <Link className='forgotpassword'>Forgot your password?</Link>
          </div>
          <div className="form-group form-button">
            <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
          </div>
        </form>
        <Typography sx={{ textAlign: 'center', color: 'grey' }}>
          Don't have an Account? <Link to='#' className="signup-link" onClick={() => { setStudentlogin(1) }}>Create an account</Link>
        </Typography>
      </div>
    </motion.div>
  );
}
