import axios from "axios";
import * as Yup from "yup";
import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Button, Card, Container, TextField } from "@material-ui/core";

const Login = (props: any) => {
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="img\우도올레1.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required("This field is required!"),
            password: Yup.string().required("This field is required!"),
          })}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <div className="form-group">
                <TextField
                  name="username"
                  type="text"
                  label="Username"
                  variant="outlined"
                  margin="dense"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <TextField
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  margin="dense"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <Button type="submit" variant="contained" color="primary">
                  <span>Login</span>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
