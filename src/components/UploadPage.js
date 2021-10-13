import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { create } from "../slices/attachment";
import { clearMessage } from "../slices/message";

export function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  const initialValues = {
    description: "",
    file: "",
  };

  const fileSizeLimit = 1;
  const checkFile = (val) => {
    if (val && val.name) {
      if (val.type.indexOf("image") === -1) return false;
      return val.size <= fileSizeLimit * 1000 * 1000;
    }
    return true;
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string().required("This field is required!"),
    file: Yup.mixed()
      .required("This field is required!")
      .test("fileSize", `file size limit ${fileSizeLimit} MB`, (val) =>
        checkFile(val)
      ),
  });

  const handleUpload = (formValue) => {
    const { file, description } = formValue;
    setLoading(true);

    dispatch(create({ file, description }))
      .unwrap()
      .then(() => {
        setLoading(false);
        setSuccessful(true);
      })
      .catch((error) => {
        setLoading(false);
        setSuccessful(false);
      });
  };
  return (
    <div className="container mt-3">
      <div className="col-md-12 upload-form">
        <div className="card card-container">
          {/* <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          /> */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleUpload}
          >
            {(formProps) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Field
                    name="description"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="file">File</label>
                  <input
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      formProps.setFieldValue("file", event.target.files[0]);
                    }}
                  />
                  <ErrorMessage
                    name="file"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary pull-right"
                    disabled={loading}
                  >
                    <span>Upload</span>
                  </button>
                </div>
              </Form>
            )}
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

export default UploadPage;
