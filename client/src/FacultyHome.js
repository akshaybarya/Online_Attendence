import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FacultyHome = () => {
  const [logs, setLogs] = useState();
  const [meetingId, setMeetingId] = useState("");
  useEffect(() => {
    const f = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/category_logs`);
        setLogs(res.data);
        //console.log(res.data);
      } catch (error) {
        //console.log(logs);
        console.error(error.message);
      }
    };
    f();
  }, []);
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
            {logs &&
              Object.entries(logs).map(([key, value]) => {
                return (
                  <Link
                    to={`/online/${key}`}
                    className="list-group-item list-group-item-action"
                  >
                    {key}
                  </Link>
                );
              })}
          </div>
        </div>
        <div class="section">
          <div class="list-group">
            <a
              href="#"
              class="list-group-item list-group-item-action active"
              aria-current="true"
            >
              <strong>Meeting Code</strong>
            </a>
            <div href="#" class="list-group-item list-group-item-action">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Meeting Code"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={meetingId}
                  onChange={(e) => {
                    setMeetingId(e.target.value);
                  }}
                />
              </div>
              <Link
                to={`/online/meeting/${meetingId}`}
                class="btn btn-primary btn-md my-btn"
              >
                Submit
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default FacultyHome;
