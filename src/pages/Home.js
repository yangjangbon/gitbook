import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const backurl = "34.64.173.117:8883";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: ["역행자", "돈키호테", "일리야스"],
      branchName: "-",
    };
    this.selectDropDwon = this.selectDropDwon.bind(this);
  }
  componentDidMount() {
    fetch("/branch", {
      method: "GET",
      // "headers": {
      //   "content-type": "application/json",
      //   "accept": "application/json"
      // },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ bookList: response.result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  selectDropDwon(item) {
    this.setState({ branchName: item });
  }

  render() {
    const { branchName } = this.state;
    let timerlink = `/timer/${branchName}`;
    return (
      <Container>
        <Row>
          <Col>
            <div className="Book-Title">GIT BOOK</div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <DropdownButton
              id="dropdown-basic-button"
              title={branchName}
              onSelect={this.selectDropDwon}
              className="d-grid gap-2"
            >
              {this.state.bookList.map((item) => {
                return (
                  <Dropdown.Item key={item} eventKey={item}>
                    {item}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Link to={{ pathname: timerlink }} className="d-grid gap-2">
              <Button>OK</Button>
            </Link>
          </Col>
          <Col>
            <Link to={{ pathname: "/add" }} className="d-grid gap-2">
              <Button>ADD</Button>
            </Link>
          </Col>
        </Row>
        <br />
        {/* <Row>
          <Col className="d-grid gap-2">
            <Button>Dashboard</Button>
          </Col>
        </Row> */}
      </Container>
    );
  }
}

export default Home;
