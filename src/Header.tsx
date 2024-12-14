import { Link } from 'react-router-dom';
import ActiveUser from './ActiveUser';
import './Header.css';
const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/channel">Channel</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
                  <ActiveUser />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
