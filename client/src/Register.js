import React, { Fragment, useState } from "react";
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

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      const body = JSON.stringify({
        name,
        email,
        password,
      });
      const res = await axios.post(
        `http://localhost:5000/register`,
        body,
        config
      );

      setMessage(res.data);
    } catch (error) {
      setLoggedIn(true);
      setMessage(error.message);
    }
    setLoading(false);
  };
  if (localStorage.getItem("isAdmin") == "true") {
    return (
      <Fragment className="vertical-center">
        <Grid centered>
          <GridRow height="300"></GridRow>
          <Grid.Row>
            <Header as="h2">
              <Icon name="user plus" />
              Register User
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              <Form size="large" icon="large" onSubmit={onSubmit}>
                <Form.Field>
                  <label>Name</label>
                  <input
                    placeholder="Name"
                    value={name}
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
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
                  <label>Password</label>
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
                  positive={!loggedIn}
                  error={loggedIn}
                  header={
                    message == "User Registered!"
                      ? "Success"
                      : "Registration Failed"
                  }
                  content={
                    message == "User Registered!"
                      ? message
                      : "Cannot Register User!"
                  }
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  } else return <Navigate to="/online/" />;
};

export default Register;
