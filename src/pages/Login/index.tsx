import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styles from './Login.module.css';
import { UserContext } from '../../userContext';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const from = location.state?.from?.pathname || '/';
  
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.VITE_API_BASE_URL || "https://brb-backend.onrender.com/api"}/auth/login`, { username, password });
      // dispatch(setUser(res.data));
      localStorage.setItem('token', JSON.stringify(res.data.accessToken));
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data); // <<< ADD THIS line
      // navigate('/');
      console.log(from, location.state?.from?.pathname, "FFFFFFFFFFFFF")
      navigate(from, { replace: true });
      toast.success('Login successful!', {
        position: 'top-right',
      });
    } catch (err) {
      console.error('Login failed:', err);
      toast.error('Login failed. Please check your credentials.', {
        position: 'top-right',
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage} />

      <div className={styles.loginBox}>
        <div className={styles.iconWrapper}>
          <div className={styles.iconCircle}>
            <LoginIcon className="text-xl text-gray-600" />
          </div>
        </div>

        <h2 className={styles.title}>Sign in with email</h2>
        <p className={styles.subtitle}>
          Make a new doc to bring your words, data, and teams together. For free
        </p>

        <div>
          <div className={styles.inputGroup}>
            <EmailIcon className={styles.inputIcon} />
            <input
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <LockIcon className={styles.inputIcon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <VisibilityIcon className={styles.eyeIcon} />
          </div>

          {/* <div className={styles.forgotPassword}>Forgot password?</div> */}

          <button onClick={handleLogin} className={styles.loginButton}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
