import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../App.css";
import CollapsibleExample from "./Header";

function StudentForm() {
  const [loginDetails, setLoginDetails] = useState({
    studentId: "",
    name: "",
    facultyName: "",
  });
  const [dataShow, setDataShow] = useState(true);
  const [error, setError] = useState("");
  const [loggedData, setLoggedData] = useState();
  const changeHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };
  const submitHandler = () => {
    if (
      loginDetails.facultyName === "" ||
      loginDetails.name === "" ||
      loginDetails.studentId === ""
    ) {
      setError("please Fill All Details before Submitting");
    } else {
      let body = {
        data: {
          studentId: loginDetails.studentId,
          studentName: loginDetails.name,
          facultyName: loginDetails.facultyName,
        },
      };
      setError("submitting");
      fetch(`http://localhost:1337/api/students-data`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((response) => {
        console.log(response.status);
        setError("submitted");
      });
      // you can wirte your code here with login details
      console.log(loginDetails);
    }
  };
  const fetchingData = () => {
    fetch(`http://localhost:1337/api/students-data`)
      .then((res) => res.json())
      .then((todo) => {
        setLoggedData(todo.data);
      });
  };
  useEffect(() => {
    fetchingData();
  }, []);

  console.log(loggedData);
  return (
    <>
      <CollapsibleExample />
      <Container fluid className="login-mainContainer py-5 bg-dark">
        <Row className="login-cardContainer px-5">
          <Col>
            <Row xs={12} className="my-4">
              <Col xs={12} md={4}>
                <label>Student ID</label>
              </Col>
              <Col xs={12} md={8}>
                <input
                  name="studentId"
                  value={loginDetails.studentId}
                  type="number"
                  onChange={(e) => changeHandler(e)}
                />
              </Col>
            </Row>
            <Row xs={12} className="my-4">
              <Col xs={12} md={4}>
                <label>Student Name</label>
              </Col>
              <Col xs={12} md={8}>
                <input
                  name="name"
                  value={loginDetails.name}
                  onChange={(e) => changeHandler(e)}
                  type="text"
                />
              </Col>
            </Row>
            <Row xs={12} className="my-4">
              <Col xs={12} md={4}>
                <label>Faculty Name</label>
              </Col>
              <Col xs={12} md={8}>
                <input
                  name="facultyName"
                  value={loginDetails.facultyName}
                  onChange={(e) => changeHandler(e)}
                  type="text"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <button
                  className="btn btn-outline-light"
                  onClick={submitHandler}
                >
                  Submit
                </button>
              </Col>
              <Col>
                <button
                  className="btn btn-outline-light"
                  onClick={() => {
                    fetchingData();
                    setDataShow(!dataShow);
                  }}
                >
                  Show/Hide Data
                </button>
              </Col>
            </Row>

            <Col xs={12} className="py-3">
              <p className="text-danger">{error}</p>
            </Col>
          </Col>
          <Col className={`m-5 ${dataShow ? "d-none" : "d-block"}`}>
            <table>
              <tr>
                <th className="text-light">Student Id</th>
                <th className="text-light">Student Name</th>
                <th className="text-light">Faculty Name</th>
              </tr>
              {loggedData?.map((each) => {
                return (
                  <tr>
                    <td className="text-light">{each.attributes.studentId}</td>
                    <td className="text-light">
                      {each.attributes.studentName}
                    </td>
                    <td className="text-light">
                      {each.attributes.facultyName}
                    </td>
                  </tr>
                );
              })}
            </table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default StudentForm;
