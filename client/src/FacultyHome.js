import React, { Fragment, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Card, Image } from "semantic-ui-react";
import ceo from "./hr.png";
import Spinner from "./spinner/Spinner";

const FacultyHome = () => {
  const [logs, setLogs] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const f = async () => {
      try {
        const config = {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        };
        const res = await axios.get(
          `http://localhost:5000/category_logs`,
          config
        );
        setLogs(res.data);

        //console.log(res.data);
      } catch (error) {
        //console.log(logs);
        console.error(error.message);
      }
    };
    f();
    setLoading(false);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (
    localStorage.getItem("token") &&
    localStorage.getItem("isAdmin") == "true"
  ) {
    return (
      <Fragment>
        <div class="container my-container">
          <div class="row text-center">
            <div class="col-12">
              <h2>Teachers</h2>
            </div>
          </div>
        </div>
        <main>
          <div class="section">
            <div class="list-group">
              <Card.Group itemsPerRow={6}>
                {logs &&
                  Object.entries(logs).map(([key, value]) => {
                    return (
                      <>
                        <Card href={`/online/${key}`}>
                          <Image src={ceo} height="200" wrapped ui={false} />
                          <Card.Content>
                            <Card.Header>{key}</Card.Header>
                          </Card.Content>
                        </Card>
                      </>
                    );
                  })}
              </Card.Group>
            </div>
          </div>
        </main>
      </Fragment>
    );
  } else return <Navigate to="/" />;
};

export default FacultyHome;
