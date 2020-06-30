import React, { useState, useCallback } from "react";
import { Alert, Form, Button, Col } from "react-bootstrap";
import styled from "styled-components";

import authDB from "./authDB";

const Centered = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled(Form)`
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
  font-weight: 400;
  text-align: center;

  & input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  & input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

const EmailFormGroup = styled(Form.Group)`
  margin-bottom: 0;
`;

const SignUpLink = styled.a`
  margin: 5px;
`;

const initialCredentials = {
  email: "",
  password: ""
};

const Login = ({ setView }) => {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [error, setError] = useState(false);

  const handleOnChange = useCallback(
    name => event => {
      setError(false);
      const value = event.target.value;
      setCredentials(preState => ({ ...preState, [name]: value }));
    },
    []
  );

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      const fromDB = authDB.db[credentials.email] || {};

      const { password } = fromDB;

      if (password === credentials.password) {
        authDB.user(fromDB);
        setView("app");
        return;
      }

      setError(true);
    },
    [setView, credentials]
  );

  return (
    <Centered>
      <LoginForm onSubmit={onSubmit} className="form-signin">
        <img
          className="mb-4"
          src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Bienvenido</h1>
        <EmailFormGroup controlId="formBasicEmail">
          <Form.Label className="sr-only">Correo Electronico</Form.Label>
          <Form.Control
            type="email"
            placeholder="ejemplo@dominio.com"
            value={credentials.email}
            onChange={handleOnChange("email")}
            required
            autoFocus
          />
        </EmailFormGroup>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="sr-only">Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={handleOnChange("password")}
            required
          />
        </Form.Group>
        {error && (
          <Alert variant="danger">
            No existe {credentials.email} en la DB.
          </Alert>
        )}
        <SignUpLink href="#" onClick={() => setView("signup")}>
          No tengo cuenta, <b>Registarme</b>
        </SignUpLink>
        <Button
          block
          size="lg"
          variant="primary"
          type="submit"
          className="mt-2"
          disabled={!credentials.email && !credentials.password}
        >
          Iniciar sesión
        </Button>
        <p className="mt-5 mb-3 text-muted">&copy; COVID19 - 2020</p>
      </LoginForm>
    </Centered>
  );
};

export default Login;
