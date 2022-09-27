import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "95fc9f",
};

function Add() {
  const backurl = "34.64.173.117:8883";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const handleSubmission = () => {
    console.log("submit");
    setLoading(true);
    const { branchName } = inputs;
    const url = "http://" + backurl + "/image/" + branchName;
    const formData = new FormData();
    formData.append("file", selectedFile);
    fetch(url, {
      method: "POST",
      body: formData,
      // headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setLoading(false);
        setInputs({ ...inputs, WPP: result.result.WPP });
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error:", error);
      });
  };
  const [inputs, setInputs] = useState({
    bookTitle: "",
    branchName: "",
    WPP: 0,
    memo: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const postData = () => {
    console.log("post");
    const url = "http://" + backurl + "/branch";
    const { bookTitle, branchName } = inputs;

    if (bookTitle && branchName) {
      console.log(bookTitle);
      console.log(branchName);
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
    }
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
            <Form.Label>Book Title</Form.Label>
            <Col>
              <Form.Control
                name="bookTitle"
                type="text"
                placeholder="Book Title"
                onChange={handleChange}
              />
            </Col>
            <br />
            <Form.Label>Branch Name</Form.Label>
            <Col>
              <Form.Control
                name="branchName"
                type="text"
                placeholder="Branch Name"
                onChange={handleChange}
              />
            </Col>
            <br />
            <Form.Label>Words per page :{inputs.WPP}</Form.Label>
            <Row>
              <Col xs={9}>
                {/* <Form.Control
                name="WPP"
                type="text"
                placeholder="160"
                onChange={handleChange}
              /> */}
                <Form.Control
                  type="file"
                  name="file"
                  onChange={changeHandler}
                />
              </Col>
              <Col xs={3}>
                <Button disabled={!isFilePicked} onClick={handleSubmission}>
                  send
                </Button>
              </Col>
            </Row>
            <br />
            {loading ? (
              <BarLoader
                color="#95fc9f"
                loading={loading}
                cssOverride={override}
                size={150}
              />
            ) : (
              ""
            )}

            <br />
            <Form.Label>Memo</Form.Label>
            <Form.Control
              name="memo"
              as="textarea"
              rows={5}
              onChange={handleChange}
            />
          </Form.Group>
          {/* <Link to={{ pathname: "/gitbook" }} className="d-grid gap-2"> */}
          <Button className="d-grid gap-2" onClick={postData}>
            Submit
          </Button>
          {/* </Link> */}
        </Form>
      </Row>
    </Container>
  );
}

export default Add;

// import { render } from "@testing-library/react";
// import React, { Component } from "react";
// import { Button, Container, Row, Col, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";

// class Add extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       bookTitle: "",
//       branchName: "",
//       MPP: 100,
//       memo: "",
//     };
//     this.postData = this.postData.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }
//   handleChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value, // <- 변경 후
//     });
//   };
//   postData = () => {
//     const url = "http://localhost:8883/branch";
//     console.log(this.props.history );
//     this.props.history.push("/gitbook");
//     let data = {
//       bookTitle: this.state.bookTitle,
//       branchName: this.state.branchName,
//       memo: this.state.memo,
//       MPP: this.state.MPP,
//     };
//     if (data.bookTitle && data.branchName) {
//       fetch(url, {
//         method: "POST", // *GET, POST, PUT, DELETE, etc.
//         mode: "cors", // no-cors, cors, *same-origin
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data), // body data type must match "Content-Type" header
//       })
//         .then((response) => response.json()) // parses JSON response into native JavaScript objects
//         .then((data) => {
//           if (data.result.status == 200) {
//           }
//         }) // JSON-string from `response.json()` call
//         .catch((error) => console.error(error));
//     }
//   };
//   render() {
//     return (
//       <Container>
//         <Row>
//           <Col>
//             <div className="Book-Title">GIT BOOK</div>
//           </Col>
//         </Row>
//         <br />
//         <Row>
//           <Form className="d-grid gap-2">
//             <Form.Group className="mb-3" controlId="formBasicTitle">
//               <Form.Label>Book Title</Form.Label>
//               <Col>
//                 <Form.Control
//                   name="bookTitle"
//                   type="text"
//                   placeholder="Book Title"
//                   onChange={this.handleChange}
//                 />
//               </Col>
//               <br />
//               <Form.Label>Branch Name</Form.Label>
//               <Col>
//                 <Form.Control
//                   name="branchName"
//                   type="text"
//                   placeholder="Branch Name"
//                   onChange={this.handleChange}
//                 />
//               </Col>
//               <br />
//               <Form.Label>Words per page</Form.Label>
//               <Col>
//                 <Form.Control
//                   name="MPP"
//                   type="text"
//                   placeholder="160"
//                   onChange={this.handleChange}
//                 />
//               </Col>
//               <br />
//               <Form.Label>Memo</Form.Label>
//               <Form.Control
//                 name="memo"
//                 as="textarea"
//                 rows={5}
//                 onChange={this.handleChange}
//               />
//             </Form.Group>
//             {/* <Link to={{ pathname: "/gitbook" }} className="d-grid gap-2"> */}
//             <Button className="d-grid gap-2" onClick={this.postData}>
//               Submit
//             </Button>
//             {/* </Link> */}
//           </Form>
//         </Row>
//       </Container>
//     );
//   }
// }

// export default Add;
