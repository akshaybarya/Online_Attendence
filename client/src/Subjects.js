import React, { Fragment, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { Icon, Card, Header } from "semantic-ui-react";
import Spinner from "./spinner/Spinner";

const Subjects = () => {
  const [details, setDetails] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const f = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        };

        const body = JSON.stringify({ user: localStorage.getItem("user") });
        const res = await axios.post(
          `http://localhost:5000/subjects`,
          body,
          config
        );
        setDetails(res.data);

        setLoading(false);
      } catch (error) {
        setErr(error);
        console.error(error);
        setLoading(false);
      }
    };
    f();
  }, []);

  if (loading) {
    return <Spinner />;
  } else if (!localStorage.getItem("token")) {
    return <Navigate to="/online/login" />;
  }

  return (
    <div>
      <div class="container my-container">
        <div class="row text-center">
          <div class="col-12">
            <Header as="h1">Subjects</Header>
          </div>
        </div>
      </div>
      <div class="container">
        <Fragment>
          <Card.Group itemsPerRow={6}>
            {details &&
              details.map((data) => {
                return (
                  <Card
                    raised
                    href={`/online/subjects/${data["name"]}`}
                    header={data["name"]}
                    description={
                      <>
                        <Icon name="computer" />
                        {data["meetings"].length}
                      </>
                    }
                  />
                );
              })}
          </Card.Group>
          {(!details || details.length == 0) && (
            <center>
              <br />
              <br />
              <br />
              <h2>No Subjects Add Some</h2>
            </center>
          )}
        </Fragment>
      </div>
    </div>
  );
};

export default Subjects;
