import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "./spinner/Spinner";

const Online = () => {
  const [user, setUser] = useState("");
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

        const res = await axios.post(`http://localhost:5000/`, {}, config);
        localStorage.setItem("user", res.data.email);
        localStorage.setItem("isAdmin", res.data.isAdmin);
        localStorage.setItem("name", res.data.name);
        setUser(res.data.email);
      } catch (error) {}
    };

    if (localStorage.getItem("token")) {
      f();
    }
    setLoading(false);
  }, []);
  if (loading) {
    return <Spinner />;
  } else if (localStorage.getItem("isAdmin") == "true") {
    return <Navigate to="/online/admin" />;
  } else if (localStorage.getItem("user") !== null) {
    return <Navigate to={`/online/${localStorage.getItem("user")}`} />;
  } else return <Navigate to="/online/login" />;
};

export default Online;
