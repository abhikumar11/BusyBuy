import React, { useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import AuthContext from "../../context/Auth/AuthContex";
const Navbar = () => {
  const [click, setClick] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const isAuthenticated = user;
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const onLogoutHandler = () => {
    scrollTop();
    logout();
  };

  return (
    <nav
      className="navbar"
      style={{
        justifyContent: "space-evenly",
        boxShadow: "rgb(17 17 26 / 5%) 0px 15px 20px",
      }}
    >
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={() => {}}>
          Busy Buy
        </NavLink>
        <ul
          className={click ? "nav-menu active" : "nav-menu"}
          onClick={scrollTop}
        >
          <li className="nav-item active">
            <NavLink
              activeclassname="active-links"
              to="/"
              className="nav-links"
              exact="true"
            >
              <span>
                <img
                  className="icon_styles"
                  src="./assets/HomeIcon.png"
                  alt="Home"
                  onClick={scrollTop}
                />
              </span>{" "}
              Home
            </NavLink>
          </li>

          {isAuthenticated && (
            <>
              <li className="nav-item active">
                <NavLink
                  activeclassname="active-links"
                  to="/myorders"
                  className="nav-links"
                >
                  <span>
                    <img
                      className="icon_styles"
                      src="./assets/Order.png"
                      alt="Order"
                      onClick={scrollTop}
                    />
                  </span>{" "}
                  My Orders
                </NavLink>
              </li>

              <li className="nav-item active">
                <NavLink
                  activeclassname="active-links"
                  to="/cart"
                  className="nav-links"
                >
                  <span>
                    <img
                      className="icon_styles"
                      src="./assets/Cart.png"
                      alt="Home"
                      onClick={scrollTop}
                    />
                  </span>{" "}
                  Cart
                </NavLink>
              </li>
            </>
          )}

          <li className="nav-item active">
            {isAuthenticated ? (
              <NavLink
                to="/"
                onClick={onLogoutHandler}
                activeclassname="active-links"
                className="nav-links"
              >
                <span>
                  <img className="icon_styles" src="./assets/Logout.png" alt="Home" />
                </span>
                Logout
              </NavLink>
            ) : (
              <>
                <NavLink
                  activeclassname="active-links"
                  to="/signin"
                  className="nav-links"
                >
                  <span>
                    <img
                      className="icon_styles"
                      src="./assets/SignIn.png"
                      alt="Home"
                      onClick={scrollTop}
                    />
                  </span>
                  SignIn
                </NavLink>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
