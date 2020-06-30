import React, { useState, useEffect, useCallback } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import authDB from "./authDB";

const Navigation = ({ setView, setStatus }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const auth = authDB.session();
    setUser(auth);
  }, []);

  const logout = useCallback(() => {
    authDB.logout();
    setView("login");
  }, [setView]);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">
        RI <small>v0.0.1</small>{" "}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" onClick={() => setStatus("enrollment")}>
            Matrícula
          </Nav.Link>
          {user.inCurse && (
            <Nav.Link href="#" onClick={() => setStatus("recipe")}>
              Factura
            </Nav.Link>
          )}
        </Nav>
        <NavDropdown title={user.name || "Usuario"} id="basic-nav-dropdown">
          <NavDropdown.Divider />
          <NavDropdown.Item href="#" onClick={logout}>
            Salir
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
