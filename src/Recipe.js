import React, { useState, useEffect } from "react";
import moment from "moment";
import { Container, Row, Col, Table } from "react-bootstrap";

import authDB from "./authDB";
import { numberFormat } from "./formatter";

const PRICE = 4.99;

const Recipe = () => {
  const [user, setUser] = useState({});
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const auth = authDB.session();
    setUser(auth);
    setSubjects(auth.subjects);
  }, []);

  return (
    <Container>
      <h2>
        <small>Nombre:</small> {user.name || "Usuario"}
      </h2>

      <h2>
        <small>Grupo:</small> COVID
      </h2>

      <h3>
        <small>Fecha:</small> {moment().format("DD/MM/yyyy HH:mm:ss a")}
      </h3>

      <hr />

      <Row>
        <Col>
          <h3>Materias</h3>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Código</th>
                <th>Materia</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {subjects.map(subject => (
                <tr key={subject.id}>
                  <td>{subject.id}</td>
                  <td>{subject.name}</td>
                  <td>B\. {numberFormat(PRICE, 2, 3, ",", ".")}</td>
                </tr>
              ))}
              <tr>
                <th colSpan="2" />
                <th>
                  B\. {numberFormat(PRICE * subjects.length, 2, 3, ",", ".")}
                </th>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Recipe;
