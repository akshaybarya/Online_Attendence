import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Attendance = () => {
  return (
    <main class="home">
      <div class="container">
        <br />
        <br />
        <br />
        <br />
        <br />

        <div class="row text-center">
          <h1>Attendance Mode</h1>
        </div>
        <br />
        <br />
        <br />
        <br />

        <div class="row text-center">
          <div class="col-3"></div>
          <div class="col-6">
            <Link class="btn" to="/online/Login">
              <Button positive>Online</Button>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link class="btn" to="/">
              <Button positive>Offline</Button>
            </Link>
          </div>
          <div class="col-3"></div>
        </div>
      </div>
    </main>
  );
};

export default Attendance;
