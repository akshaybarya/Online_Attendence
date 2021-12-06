import React, { Fragment, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Form,
  Button,
  Grid,
  Header,
  Icon,
  GridRow,
  Message,
} from "semantic-ui-react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        email,
        password,
      });
      const res = await axios.post(`http://localhost:5000/login`, body, config);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("loading", true);

      setLoggedIn(true);

      window.location.reload();
    } catch (error) {
      setMessage(error.message);
    }
    setLoading(false);
  };
  if (loggedIn == true || localStorage.getItem("token")) {
    return <Navigate to="/online/" />;
  } else {
    return (
      <Fragment className="vertical-center">
        <Grid centered>
          <GridRow height="300"></GridRow>
          <Grid.Row>
            <Header as="h2">
              <Icon name="sign-in" />
              Login
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              <Form size="large" icon="large" onSubmit={onSubmit}>
                <Form.Field>
                  <label>First Name</label>
                  <input
                    placeholder="Email"
                    value={email}
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input
                    placeholder="Password"
                    value={password}
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Field>

                <Button type="submit" primary loading={loading}>
                  Submit
                </Button>
              </Form>
              {message && (
                <Message
                  error
                  header="Login Failed"
                  content="Invalid Credentials"
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
};

export default Login;
