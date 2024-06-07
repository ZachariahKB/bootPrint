import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
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
                  My Recources
                </Link>
              </li>
              {/*  */}
              <li className="nav-item">
                <Link className="nav-link text-light" to="/">
                  
                </Link>
              </li>
              {/* Add more nav links as needed */}
            </ul>
          </nav>
        )}
        <div>
          {Auth.loggedIn() ? (
            <>
              {/* <Link className="btn btn-lg btn-info m-2" to={`/profiles/${Auth.getProfile().data.username}`}>
                {Auth.getProfile().data.username}'s profile
              </Link> */}
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <p className="m-0"></p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;