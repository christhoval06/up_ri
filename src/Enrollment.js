import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, ListGroup, Alert, Button } from "react-bootstrap";

import authDB from "./authDB";
import { shuffle } from "./array";
import subjectsDB from "./subjects";

const LIMIT = 5;
const AVAILABLE = 10;
const ADD = 2;
const REMOVE = 2;

const Enrrollment = ({ setView, setStatus }) => {
  const [user, setUser] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  const [add, setAdd] = useState(0);
  const [remove, setRemove] = useState(0);

  useEffect(() => {
    const auth = authDB.session();
    setUser(auth);

    const s = shuffle(subjectsDB).slice(0, AVAILABLE);
    if (!auth.subjects) {
      setSubjects(s.slice(0, LIMIT));
      setAvailableSubjects(s.slice(LIMIT, AVAILABLE));
      return;
    }
    setSubjects(auth.subjects);
    setRemove(REMOVE);
  }, []);

  const logout = useCallback(() => {
    authDB.logout();
    setView("login");
  }, [setView]);

  const addToSubjects = useCallback(
    subject => {
      if (add < ADD) {
        setSubjects(prev => {
          if (prev.length < LIMIT) {
            prev.push(subject);
            setAvailableSubjects(p => {
              return p.filter(m => m.id !== subject.id);
            });
            setAdd(prev => prev + 1);
          }
          return prev;
        });
      }
    },
    [add]
  );

  const removeSubjects = useCallback(
    subject => {
      if (remove < REMOVE) {
        setAvailableSubjects(prev => {
          prev.push(subject);
          setSubjects(p => {
            return p.filter(m => m.id !== subject.id);
          });
          return prev;
        });
        setRemove(prev => prev + 1);
      }
    },
    [remove]
  );

  const save = useCallback(() => {
    authDB.save(subjects);
    window.location.reload();
  }, [subjects]);

  return (
    <Container>
      <h1>Bienvenido {user.name || "Usuario"} </h1>

      <hr />

      {!user.inCurse && ADD - add > 0 && (
        <Alert variant="primary">
          <b>*</b>Puedes incluir {ADD - add} materias
        </Alert>
      )}

      {!user.inCurse && REMOVE - remove > 0 && (
        <Alert variant="primary">
          <b>*</b>Puedes retirar {REMOVE - remove} materias
        </Alert>
      )}
      <Row>
        <Col>
          <h3>
            Materias para el semestre
            <small>({subjects.length})</small>
          </h3>
          <ListGroup>
            {subjects.map(subject => (
              <ListGroup.Item
                action
                key={subject.id}
                onClick={() => removeSubjects(subject)}
              >
                {subject.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <h3>
            Materias disponibles
            <small>({availableSubjects.length})</small>
          </h3>
          <ListGroup>
            {availableSubjects.map(subject => (
              <ListGroup.Item
                action
                key={subject.id}
                onClick={() => addToSubjects(subject)}
              >
                {subject.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          {!user.inCurse && (
            <Button
              className="mt-5"
              variant="primary"
              type="button"
              onClick={save}
            >
              Matricular
            </Button>
          )}
          {user.inCurse && (
            <Button
              className="mt-5"
              variant="secondary"
              type="button"
              onClick={() => setStatus("recipe")}
            >
              Ver recibo
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Enrrollment;
