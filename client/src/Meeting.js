import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Meeting = () => {
  const [meetingId, setMeetingId] = useState("");
  if (localStorage.getItem("token"))
    return (
      <div class="container">
        <div class="row">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <div class="row">
          <div class="col-3"></div>
          <div class="col-6">
            <div class="container section">
              <div class="list-group">
                <a
                  href="#"
                  class="list-group-item list-group-item-action active"
                  aria-current="true"
                >
                  <strong>Meeting Code</strong>
                </a>
                <div href="#" class="list-group-item list-group-item-action">
                  <br></br>

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
          </div>
          <div class="col3"></div>
        </div>
      </div>
    );
  else return <Navigate to="/" />;
};

export default Meeting;
