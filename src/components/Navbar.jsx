import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";

const Navbar = () => {
  // Access isLoggedIn state from the AuthContext
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          LinkdIron
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {isLoggedIn ? (
          <>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav  ml-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/Feed"}
                  >
                    Feed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/Profile"}>
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/PostDetails'}>Create New Post</Link>
                </li>
              </ul>
            </div>
            <span className="navbar-text">
              <div className="userStatus">
                <p>Hi {user.username}!</p>
                <button onClick={logOutUser}>Logout</button>
              </div>
            </span>
          </>
        ) : (
          <div className="navbar-text">
            <div className="userStatus">
              <Link to={"/Login"}>
                <button>Login</button>
              </Link>
              <Link c to={"/Signup"}>
                <button>Signup</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
