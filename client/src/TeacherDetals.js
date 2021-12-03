import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const TeacherDetals = () => {
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
        `http://localhost:5000/teacher_logs`,
        body,
        config
      );

      setDetails(res.data.class);
    };
    f();
  }, []);

  return (
    <div>
      <Fragment>
        <div class="container my-container">
          <div class="row text-center">
            <div class="col-12">
              <h2>Welcome {params.id}</h2>
            </div>
          </div>
        </div>
        <main>
          <div class="section">
            <div class="list-group">
              {details &&
                details.map((data) => {
                  return (
                    <Link
                      to={`/online/meeting/${data["Meeting Code"]}`}
                      className="list-group-item list-group-item-action"
                    >
                      {data["Meeting Code"]}
                    </Link>
                  );
                })}
            </div>
          </div>
        </main>
      </Fragment>
    </div>
  );
};

export default TeacherDetals;
