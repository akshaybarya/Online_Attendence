import React, { useState, useEffect } from "react";
import iet from "./ietlogom.png";
import { Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [logged, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("name");
    setLoggedIn(false);
    window.location.reload();
  };

  return (
    <>
      <Menu color="green" inverted borderless size="massive">
        <Menu.Item name="home">
          <Link to="/">
            <Image src={iet} height="80" />
          </Link>
        </Menu.Item>
        {logged && (
          <Menu.Menu position="right">
            <Menu.Item position="right">
              <Link to="/online/">Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/online/meeting">Meetings</Link>
            </Menu.Item>
            {localStorage.getItem("isAdmin") !== "true" && (
              <>
                <Menu.Item>
                  <Link to="/online/subjects">Subjects</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/online/add-subjects">Add Subjects</Link>
                </Menu.Item>
              </>
            )}
            {localStorage.getItem("isAdmin") == "true" && (
              <>
                <Menu.Item>
                  <Link to="/online/admin/upload-CSV">Upload CSV</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/online/admin/register">Register User</Link>
                </Menu.Item>
              </>
            )}
            <Menu.Item>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
              </a>
            </Menu.Item>
          </Menu.Menu>
        )}
        {!logged && (
          <Menu.Menu position="right">
            <Menu.Item position="right">
              <Link to="/online/login">Login</Link>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    </>
  );
};

export default Header;
