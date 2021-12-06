import React, { Fragment, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { Icon, Card, Header } from "semantic-ui-react";
import Spinner from "./spinner/Spinner";

const TeacherDetals = () => {
  const params = useParams();
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

        const body = JSON.stringify({ id: params.id });
        const res = await axios.post(
          `http://localhost:5000/teacher_logs`,
          body,
          config
        );
        setDetails(res.data.class);

        setLoading(false);
      } catch (error) {
        setErr(error);
      }
    };
    f();
  }, []);

  if (loading) {
    return <Spinner />;
  } else if (!localStorage.getItem("token") || err) {
    return <Navigate to="/online/" />;
  }

  return (
    <div>
      <div class="container my-container">
        <div class="row text-center">
          <div class="col-12">
            <Header as="h1">
              Welcome{" "}
              {localStorage.getItem("user") == params.id
                ? localStorage.getItem("name")
                : params.id}
            </Header>
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
                    href={`/online/meeting/${data["Meeting Code"]}`}
                    header={
                      data["date"][17] === ":"
                        ? data["date"].substring(0, 17)
                        : data["date"].substring(0, 18)
                    }
                    meta={data["Meeting Code"]}
                    description={
                      <>
                        <Icon name="user" />
                        {data["number of participants"]}
                      </>
                    }
                  />
                );
              })}
          </Card.Group>
        </Fragment>
      </div>
    </div>
  );
};

export default TeacherDetals;
