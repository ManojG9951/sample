import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../App.css";
import CollapsibleExample from "./Header";

function FacultyForm() {
  const [loginDetails, setLoginDetails] = useState({
    facultyId: "",
    facultyName: "",
  });
  const [dataShow, setDataShow] = useState(true);
  const [loggedData, setLoggedData] = useState();
  const [error, setError] = useState("");
  const changeHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };
  const submitHandler = () => {
    if (loginDetails.facultyId === "" || loginDetails.facultyName === "") {
      setError("please Fill All Details before login");
    } else {
      let body = {
        data: {
          facultyName: loginDetails.facultyName,
          facultyId: loginDetails.facultyId,
        },
      };
      setError("submitting");
      fetch(`http://localhost:1337/api/faculties`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((response) => {
        console.log(response.status);
        setError("submitted");
      });
      console.log(loginDetails);
      // you can wirte your code here with login details
    }
  };
  const fetchingData = () => {
    fetch(`http://localhost:1337/api/faculties`)
      .then((res) => res.json())
      .then((todo) => {
        setLoggedData(todo.data);
      });
  };
  useEffect(() => {
    fetchingData();
  }, []);
  // console.log(loginDetails);
  return (
    <>
      <CollapsibleExample />
      <Container fluid className="login-mainContainer bg-dark">
        <Row className="login-cardContainer px-5">
          <Col>
            <Row xs={12} className="my-4">
              <Col xs={12} md={4}>
                <label>Faculty Id</label>
              </Col>
              <Col xs={12} md={8}>
                <input
                  name="facultyId"
                  value={loginDetails.facultyId}
                  type="number"
                  onChange={(e) => changeHandler(e)}
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
                <th className="text-light">Faculty Id</th>
                <th className="text-light">Faculty Name</th>
              </tr>
              {loggedData?.map((each) => {
                return (
                  <tr>
                    <td className="text-light">{each.attributes.facultyId}</td>
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

export default FacultyForm;
