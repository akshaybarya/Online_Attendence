import React, { Fragment, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Upload_CSV = () => {
  const [file, setFile] = useState();
  const upload = async () => {
    try {
      const formData = new FormData();

      // Update the formData object
      formData.append("file", file, file.name);

      // Request made to the backend api
      // Send formData object
      const res = await axios.post(`http://localhost:5000/add-csv`, formData);

      alert(res.data);
    } catch (error) {
      console.error(error);
      alert("Could not upload!");
    }
  };

  if (
    localStorage.getItem("token") &&
    localStorage.getItem("isAdmin") == "true"
  )
    return (
      <Fragment>
        <div class="container my-container">
          <div class="row text-center">
            <div class="col-12">
              <h2>Add CSV File</h2>
            </div>
          </div>
        </div>
        <main>
          <div class="section">
            <div class="list-group">
              <a
                href="#"
                class="list-group-item list-group-item-action active"
                aria-current="true"
              >
                <strong>ADD CSV FILE</strong>
              </a>
              <div class="list-group-item list-group-item-action">
                <form encType="multipart/form-data" onSubmit={upload}>
                  <div class="input-group mb-3">
                    <input
                      type="file"
                      class="form-control"
                      placeholder="CSV FILE"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </div>
                  <button type="submit" class="btn btn-primary btn-md my-btn">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </Fragment>
    );
  else return <Navigate to="/online/" />;
};

export default Upload_CSV;
