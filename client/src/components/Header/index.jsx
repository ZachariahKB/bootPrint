import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/home">
            <h1 className="m-0">🥾BootPrint👣</h1>
          </Link>
          <p className="m-0">These Boots Are Made For Coding!</p>
        </div>
        <div>
          {location.pathname !== '/' && (
            <button
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              &larr; Go Back
            </button>
          )}
        </div>
        {Auth.loggedIn() && (
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/home">
                  My Resources
                </Link>
              </li>
              {/* Add more nav links as needed */}
            </ul>
          </nav>
        )}
        <div>
          {Auth.loggedIn() ? (
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
          ) : (
            <p className="m-0"></p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
