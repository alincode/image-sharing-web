import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../slices/auth";
import { clearMessage, setMessage } from "../slices/message";

export function RegisterPage() {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const checkPasswordLength = (val) =>
    val && val.toString().length >= 8 && val.toString().length <= 40;

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 6 and 20 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 20
      )
      .required("This field is required!"),

    password: Yup.string()
      .required("This field is required!")
      .test("len", "The password must be between 8 and 40 characters.", (val) =>
        checkPasswordLength(val)
      ),

    confirmPassword: Yup.string()
      .required("This field is required!")
      .test("confirm password", "Passwords don't match.", (val) => {
        let isValid = checkPasswordLength(val);
        return isValid;
      }),
  });

  const handleRegister = (formValue) => {
    const { username, password, confirmPassword } = formValue;

    if (password !== confirmPassword) {
      setMessage("Passwords don't match.");
      return;
    }

    setSuccessful(false);

    dispatch(register({ username, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        window.location.reload();
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="container mt-3">
      <div className="col-md-12 login-form">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  <span>Sign Up</span>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
