import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MeetingDetails = () => {
  const params = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const f = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
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

  return (
    <div>
      <Fragment>
        <div class="container my-container">
          <div class="row text-center">
            <div class="col-12">
              <h2>Meeting {params.id}</h2>
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
                  <span class="floater">{details[0]["Organizer Email"]}</span>
                </div>
              )}
              {details &&
                details.map((data) => {
                  return (
                    <div className="list-group-item list-group-item-action">
                      <b>{data["Participant Name"]}</b>
                      <span class="floater">
                        {data["Participant Identifier"]}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
      </Fragment>
    </div>
  );
};

export default MeetingDetails;
