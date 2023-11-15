import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <h1>
        <Link to="/">Devmons!</Link>
      </h1>
      <ul className="nav-list">
        <Link to="/">
          <li className="nav-item">Home</li>
        </Link>
        <li className="nav-item">About</li>
        <Link to="/feed">
          <li className="nav-item">Posts</li>
        </Link>
        <li className="nav-item">Profile</li>
      </ul>
    </nav>
  );
}

export default NavBar;
