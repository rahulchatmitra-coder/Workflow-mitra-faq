import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import './Auth.css';

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Welcome back</h2>
          <p>Enter your details to access your account.</p>
        </div>
        <div className="auth-social">
          <button className="auth-social-btn"><FcGoogle size={20}/> Continue with Google</button>
          <button className="auth-social-btn"><FaGithub size={20}/> Continue with GitHub</button>
        </div>
        <div className="auth-divider">
          <span>or</span>
        </div>
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="auth-submit">Sign in</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
