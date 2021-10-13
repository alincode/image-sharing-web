import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import UploadPage from "./components/UploadPage";

import Logo from "./components/Logo";

import { logout } from "./slices/auth";

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutEvent = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Logo />
          <div className="navbar-nav ml-auto">
            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/upload">
                    Upload
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link"
                    onClick={logoutEvent}
                    data-test="nav-logout"
                  >
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" data-test="nav-login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    data-test="nav-signup"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </div>
        </nav>
        <Switch>
          <Route exact path={["/", "/home"]} component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/upload" component={UploadPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
