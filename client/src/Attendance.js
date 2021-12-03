import React from "react";
import { Link } from "react-router-dom";

const Attendance = () => {
  return (
    <main class="home">
      <h2>Attendance Mode</h2>
      <div>
        <Link class="btn" to="/online">
          Online
        </Link>
        <Link class="btn" to="/">
          Offline
        </Link>
      </div>
    </main>
  );
};

export default Attendance;
