import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import './Auth.css';

const Signup = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Create an account</h2>
          <p>Start building AI agents in minutes.</p>
        </div>
        <div className="auth-social">
          <button className="auth-social-btn"><FcGoogle size={20}/> Sign up with Google</button>
          <button className="auth-social-btn"><FaGithub size={20}/> Sign up with GitHub</button>
        </div>
        <div className="auth-divider">
          <span>or</span>
        </div>
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button type="submit" className="auth-submit">Create account</button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
