import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const changeHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };
  const submitHandler = () => {
    if (loginDetails.username === "" || loginDetails.password === "") {
      setError("please Fill All Details before login");
    } else {
      let body = {
        data: {
          username: loginDetails.username,
          password: loginDetails.password,
        },
      };
      fetch(`http://localhost:1337/api/login-details`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((response) => {
        console.log(response.status);
      });

      setError("");
      // you can wirte your code here with login details
      navigate("/student-details/");
    }
  };
  // console.log(loginDetails);
  return (
    <Container fluid className="login-mainContainer bg-dark">
      <Row className="login-cardContainer px-5">
        <Col>
          <Row xs={12} className="my-4">
            <Col xs={12} md={4}>
              <label>Username</label>
            </Col>
            <Col xs={12} md={8}>
              <input
                name="username"
                value={loginDetails.username}
                type="text"
                onChange={(e) => changeHandler(e)}
              />
            </Col>
          </Row>
          <Row xs={12} className="my-4">
            <Col xs={12} md={4}>
              <label>Password</label>
            </Col>
            <Col xs={12} md={8}>
              <input
                name="password"
                value={loginDetails.password}
                onChange={(e) => changeHandler(e)}
                type="password"
              />
            </Col>
          </Row>
          <Col>
            <button className="btn btn-outline-light" onClick={submitHandler}>
              Login
            </button>
          </Col>
          <Col xs={12} className="py-3">
            <p className="text-danger">{error}</p>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
