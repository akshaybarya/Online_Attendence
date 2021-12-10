import React, { Fragment, useEffect, useState } from "react";
import exportFromJSON from "export-from-json";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Image } from "semantic-ui-react";
import ceo from "./CEO.png";

const MeetingDetails = () => {
  const params = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fileName = "download";
  const exportType = "xls";

  useEffect(() => {
    const f = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      const body = JSON.stringify({ id: params.id });
      const res = await axios.post(
        `http://localhost:5000/meeting_logs`,
        body,
        config
      );

      setDetails(res.data);
    };
    f();
  }, []);

  const attendance = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      const body = JSON.stringify({ id: params.id });
      const res = await axios.post(
        `http://localhost:5000/attendence/`,
        body,
        config
      );

      const data = res.data;
      await exportFromJSON({ data, fileName, exportType });
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  if (!localStorage.getItem("token")) {
    return <Navigate to="/online/login" />;
  } else if (
    details &&
    details.length > 0 &&
    localStorage.getItem("user") !== details[0]["Organizer Email"] &&
    localStorage.getItem("isAdmin") !== "true"
  ) {
    return <Navigate to="/online/" />;
  }

  return (
    <div>
      <Fragment>
        <div class="container my-container">
          <div class="row text-center">
            <div class="col-12">
              <h2>
                Meeting {params.id}{" "}
                {details && details[0] && (
                  <>Organised by {details[0]["Organizer Email"]}</>
                )}
              </h2>
            </div>
          </div>
        </div>
        <main>
          <div class="section">
            <div class="list-group">
              {details && details[0] && (
                <div className="list-group-item list-group-item-action">
                  <b>{details[0].date}</b>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    floated="right"
                    primary
                    loading={loading}
                    onClick={attendance}
                  >
                    Download Attendance
                  </Button>
                </div>
              )}
              <Card.Group itemsPerRow={10}>
                {details &&
                  details.map((data) => {
                    if (data["Participant Name"])
                      return (
                        <Card>
                          <Image src={ceo} wrapped ui={false} />
                          <Card.Content>
                            <Card.Header>
                              {data["Participant Name"]}
                            </Card.Header>
                            <Card.Meta>{data["Duration"]}</Card.Meta>
                            <Card.Description>
                              {data["Participant Identifier"]}
                            </Card.Description>
                          </Card.Content>
                        </Card>
                      );
                  })}
              </Card.Group>
            </div>
          </div>
        </main>
      </Fragment>
    </div>
  );
};

export default MeetingDetails;
