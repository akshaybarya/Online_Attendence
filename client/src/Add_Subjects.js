import React, { Fragment, useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Grid,
  Header,
  Icon,
  GridRow,
  Message,
  Card,
} from "semantic-ui-react";
import axios from "axios";

const Add_Subjects = () => {
  const params = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [meetings, setMeetings] = useState([]);
  const [details, setDetails] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const f = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        };

        const body = JSON.stringify({ id: localStorage.getItem("user") });
        const res = await axios.post(
          `http://localhost:5000/teacher_logs`,
          body,
          config
        );
        setDetails(res.data.class);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    f();
  }, []);

  const addMeetings = (e) => {
    let temp = meetings;

    const index = temp.indexOf(e.target.value);
    if (index > -1) {
      temp.splice(index, 1);
    } else {
      temp.push(e.target.value);
    }
    setMeetings(temp);
  };

  const onSubmit = async () => {
    setLoading(true);
    setMessage("");
    setEmail(localStorage.getItem("user"));

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      const body = JSON.stringify({
        subject: name,
        email,
        meetings,
      });
      const res = await axios.post(
        `http://localhost:5000/meeting/save`,
        body,
        config
      );
      setLoggedIn(true);
      setMessage("Meeting Saved");
    } catch (error) {
      setLoggedIn(false);
      setMessage(error.message);
    }
    setLoading(false);
  };
  if (localStorage.getItem("token")) {
    return (
      <Fragment className="vertical-center">
        <Grid centered>
          <GridRow height="300"></GridRow>
          <Grid.Row>
            <Header as="h2">
              <Icon name="user plus" />
              Add_Subjects
            </Header>
          </Grid.Row>
          <GridRow height="300"></GridRow>
          <Grid.Row>
            <Grid.Column width={5}>
              <Form size="large" icon="large" onSubmit={onSubmit}>
                <Form.Field>
                  <label>Subject Name</label>
                  <input
                    placeholder="Name"
                    value={name}
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Field>

                {details &&
                  details.map((data) => {
                    let toggle = false;
                    return (
                      <Form.Field
                        label={
                          data["Meeting Code"] +
                          "                         " +
                          data["date"].substring(0, 19)
                        }
                        control="input"
                        toggle={toggle}
                        type="checkbox"
                        name="htmlRadios"
                        value={data["Meeting Code"]}
                        onChange={(e) => {
                          toggle = !toggle;
                          addMeetings(e);
                        }}
                      />
                    );
                  })}

                <Button type="submit" primary loading={loading}>
                  Submit
                </Button>
              </Form>
              {message && (
                <Message
                  positive={loggedIn}
                  error={!loggedIn}
                  header={message !== "Meeting Saved" ? "Failed" : "Success"}
                  content={
                    message !== "Meeting Saved"
                      ? "Cannot save meeting"
                      : "Meetings saved!"
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

export default Add_Subjects;
