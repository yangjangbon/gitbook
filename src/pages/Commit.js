import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
const Commit = () => {
  const [bookTitle, setBookTitle] = useState("Book Title");
  const location = useLocation();
  const WPM = location.state.WPM;
  console.log(WPM);
  function fileSave() {}

  return (
    <Container>
      <Row>
        <Col>
          <div className="Book-Title">GIT BOOK</div>
        </Col>
      </Row>
      <br />
      <Row>
        <Form className="d-grid gap-2">
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Words read per minute : {WPM}</Form.Label>
            <br />
            <br />
            <Form.Label>Commit Message</Form.Label>
            <Form.Control as="textarea" rows={10} />
          </Form.Group>
          <Link to={{ pathname: "/gitbook" }} className="d-grid gap-2">
            <Row>
              <Col className="d-grid gap-2">
                <Button className="d-grid gap-2" onClick={fileSave}>
                  Commit
                </Button>
              </Col>
              <Col className="d-grid gap-2">
                <Button className="d-grid gap-2" onClick={fileSave}>
                  Merge
                </Button>
              </Col>
            </Row>
          </Link>
        </Form>
      </Row>
    </Container>
  );
};

export default Commit;
