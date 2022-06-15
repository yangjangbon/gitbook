import React,{Component} from 'react'
import {Button, Container, Row, Col,DropdownButton, Dropdown} from 'react-bootstrap';

function Commit() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row>
            <Col>
              <h1>GIT BOOK</h1>
            </Col>
          </Row>
          <Row>
            <Col>
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button>OK</Button>
            </Col>
            <Col>
              <Button>ADD</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button>Dashboard</Button>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default Commit;
