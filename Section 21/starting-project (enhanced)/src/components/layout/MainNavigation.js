import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Quotes</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            {isLoggedIn && (
              <NavLink to="/profile" activeClassName={classes.active}>
                Change Password
              </NavLink>
            )}
          </li>
          <li>
            {isLoggedIn && (
              <NavLink to="/quotes" activeClassName={classes.active}>
                All Quotes
              </NavLink>
            )}
          </li>
          <li>
            {isLoggedIn && (
              <NavLink to="/new-quote" activeClassName={classes.active}>
                New Quote
              </NavLink>
            )}
          </li>
          <li>
            {isLoggedIn && (
              <button className={classes.navLinkBtn} onClick={logoutHandler}>
                Logout
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
