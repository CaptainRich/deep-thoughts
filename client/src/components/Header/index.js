import React from 'react';
import { Link } from 'react-router-dom';

// Import the authentication services we setup
import Auth from '../../utils/auth';

const Header = () => {

  const logout = event => {
    event.preventDefault();  // This prevents the <a>logout</a> below from loading a different resource.
    Auth.logout();
  };

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
           <h1>Deep Thoughts</h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">My Profile</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
              <>
                {/* In the DOM, 'Link' becomes '<a></a>', and 'to' becomes 'href' */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
        </nav>

      </div>
    </header>
  );
};

export default Header;
