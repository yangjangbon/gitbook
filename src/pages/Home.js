import { render } from '@testing-library/react';
import React,{Component, useState} from 'react';
import {Button, Container, Row, Col,DropdownButton, Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';


const Home = ()=> {
  const [bookTitle, setBookTitle] = useState("Book Title");
  function selectDropDwon(item){
    setBookTitle(item);
  }
  let link = `/timer/${bookTitle}`
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row>
            <Col>
              <h1>GIT BOOK</h1>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col>
            <DropdownButton id="dropdown-basic-button" title={bookTitle} onSelect={selectDropDwon}>
              <Dropdown.Item eventKey="book1">book1</Dropdown.Item>
              <Dropdown.Item eventKey="book2">book2</Dropdown.Item>
              <Dropdown.Item eventKey="book3">book3</Dropdown.Item>
            </DropdownButton>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col>
              <Link to = {{pathname:link}} >
                <Button>OK</Button>
              </Link>
              
            </Col>
            <Col>
              <Button>ADD</Button>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col>
              <Button>Dashboard</Button>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
    );
};

export default Home;
