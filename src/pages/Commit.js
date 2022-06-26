import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useLocation, useParams, useNavigate } from "react-router-dom";
const Commit = () => {
  const navigate = useNavigate();
  const { branchName } = useParams();
  const location = useLocation();
  const WPM = location.state.WPM;
  const start = location.state.start;
  const end = location.state.end;
  console.log(WPM);
  const [inputs, setInputs] = useState({
    commitMessage: "",
    WPM: WPM,
    start: start,
    end: end,
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const postCommit = () => {
    const url = "http://34.64.244.165:8883/commit/" + branchName;

    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs), // body data type must match "Content-Type" header
    })
      .then((response) => response.json()) // parses JSON response into native JavaScript objects
      .then((data) => {
        if (data.result.status === 200) {
          navigate("/");
        }
      }) // JSON-string from `response.json()` call
      .catch((error) => console.error(error));
  };

  const postMerge = () => {
    const url = "http://34.64.244.165:8883/merge/" + branchName;

    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs), // body data type must match "Content-Type" header
    })
      .then((response) => response.json()) // parses JSON response into native JavaScript objects
      .then((data) => {
        if (data.result.status === 200) {
          navigate("/");
        }
      }) // JSON-string from `response.json()` call
      .catch((error) => console.error(error));
  };
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
            <Form.Control
              onChange={handleChange}
              name="commitMessage"
              as="textarea"
              rows={10}
            />
          </Form.Group>

          <Row>
            <Col className="d-grid gap-2">
              <Button className="d-grid gap-2" onClick={postCommit}>
                Commit
              </Button>
            </Col>
            <Col className="d-grid gap-2">
              <Button className="d-grid gap-2" onClick={postMerge}>
                Merge
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default Commit;
