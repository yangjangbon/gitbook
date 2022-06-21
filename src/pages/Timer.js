import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Timer = () => {
  const { title } = useParams();
  const [minutes, setMinutes] = useState(parseInt(25));
  const [seconds, setSeconds] = useState(parseInt(0));
  const [started, setStarted] = useState(false);
  const timerStart = () => {
    setStarted(!started);
  };
  const timerReset = () => {
    setStarted(false);
    setMinutes(parseInt(25));
    setSeconds(parseInt(0));
  };
  useEffect(() => {
    if (started) {
      const countdown = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            clearInterval(countdown);
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [minutes, seconds, started]);
  return (
    <Container>
      <Form className="d-grid gap-2">
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Row>
            <Col>
              <div className="Book-Title">{title}</div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <div className="Bookmark">Bookmark : {}</div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <div className="Time-Counter">
                {minutes < 10 ? `0${minutes}` : minutes} :{" "}
                {seconds < 10 ? `0${seconds}` : seconds}
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="d-grid gap-2">
              <Button onClick={timerStart}>{started ? "STOP" : "START"}</Button>
            </Col>
            <Col className="d-grid gap-2">
              <Button onClick={timerReset}>RESET</Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Start Page</Form.Label>
            </Col>
            <Col>
              <Form.Control type="number" placeholder="" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>End Page</Form.Label>
            </Col>
            <Col>
              <Form.Control type="number" placeholder="" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="d-grid gap-2">
              <Link to={{ pathname: "/commit" }} className="d-grid gap-2">
                <Button>OK</Button>
              </Link>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Timer;
