import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
const Add = () => {
  const [bookTitle, setBookTitle] = useState("Book Title");
  function selectDropDwon(item) {
    setBookTitle(item);
  }
  function fileSave() {}
  let link = `/timer/${bookTitle}`;
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
            <Form.Label>Book Title</Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Book Title" />
            </Col>
            <br />
            <Form.Label>Words per page</Form.Label>
            <Col>
              <Form.Control type="text" placeholder="160" />
            </Col>
            <br />
            <Form.Label>Memo</Form.Label>
            <Form.Control as="textarea" rows={5} />
          </Form.Group>
          <Link to={{ pathname: "/gitbook" }} className="d-grid gap-2">
            <Button className="d-grid gap-2" onClick={fileSave}>
              Submit
            </Button>
          </Link>
        </Form>
      </Row>
    </Container>
  );
};

export default Add;
