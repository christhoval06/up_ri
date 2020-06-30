import React, { useState, useCallback } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import styled from "styled-components";

import authDB from "./authDB";

const Centered = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const initial = {
  email: "",
  password: "",
  password2: "",
  name: ""
};

const SignUp = ({ setView }) => {
  const [data, setData] = useState(initial);
  const [error, setError] = useState("");

  const handleOnChange = useCallback(
    name => event => {
      setError(false);
      const value = event.target.value;
      setData(preState => ({ ...preState, [name]: value }));
    },
    []
  );

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      const { email, password, password2 } = data;

      if (password !== password2) {
        setError("Las contraseñas no coinciden!");
        return;
      }

      if (authDB.db[email]) {
        setError("Ya existe una cuenta para este usuario!");
        return;
      }

      authDB.addAndLogin(data);
      setView("app");
    },
    [setView, data]
  );

  return (
    <Centered>
      <div className="card">
        <div className="card-body">
          <Form onSubmit={onSubmit}>
            <h1>Registro</h1>
            <Form.Group controlId="formBasicName">
              <Form.Label>Tu mombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={data.name}
                onChange={handleOnChange("name")}
                required
                autoFocus
              />
            </Form.Group>

            <Form.Group controlId="formBasicState" className="sr-only">
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={handleOnChange("state")}
                value={data.state}
              >
                <option value="1">Bocas del Toro</option>
                <option value="8">Panama</option>
                <option value="5">Darien</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo Eléctronico</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@dominio.com"
                value={data.email}
                required
                onChange={handleOnChange("email")}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={data.password}
                onChange={handleOnChange("password")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirma tu Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={data.password2}
                onChange={handleOnChange("password2")}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </Form>
        </div>
      </div>
    </Centered>
  );
};

export default SignUp;
