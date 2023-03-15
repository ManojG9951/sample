import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../App.css";
import CollapsibleExample from "./Header";

function StudentForm() {
  // Edit Option Hooks
  const [isOpen, setIsOpen] = useState(false);
  const [studentId, setstudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [popupError, setPopupError] = useState("");
  const [editElement, setEditElement] = useState("");

  // new student form Details hooks
  const [loginDetails, setLoginDetails] = useState({
    studentId: "",
    name: "",
    facultyName: "",
  });
  const [error, setError] = useState("");

  // data showing Hooks
  const [dataShow, setDataShow] = useState(true);

  // getting data Hook
  const [loggedData, setLoggedData] = useState();

  // handler functions
  const changeHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission
    if (studentId === "" || studentName === "" || facultyName === "") {
      setPopupError("please fill all details");
    } else {
      let body = {
        data: {
          studentId: studentId,
          studentName: studentName,
          facultyName: facultyName,
        },
      };

      fetch(
        `http://localhost:1337/api/students-data/${editElement.toString()}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      ).then(() => {
        fetchingData();
        setstudentId("");
        setStudentName("");
        setFacultyName("");
        setPopupError("");
        setIsOpen(false);
      });
    }
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
        fetchingData();
      });
      // you can wirte your code here with login details
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

  const deleteHandler = (id) => {
    // console.log(id)
    fetch(`http://localhost:1337/api/students-data/${id.toString()}`, {
      method: "DELETE",
    }).then((response) => {
      console.log(response.status);
      fetchingData();
    });
  };

  return (
    <>
      <CollapsibleExample />
      {isOpen && (
        <div className="popup-container">
          <form className="popup-form" onSubmit={handleSubmit}>
            <label>
              Student id:
              <input
                className="popup-input"
                type="number"
                value={studentId}
                onChange={(event) => setstudentId(event.target.value)}
              />
            </label>
            <br />
            <label>
              Student Name:
              <input
                className="popup-input"
                type="text"
                value={studentName}
                onChange={(event) => setStudentName(event.target.value)}
              />
            </label>
            <br />
            <label>
              FacultyName:
              <input
                className="popup-input"
                type="text"
                value={facultyName}
                onChange={(event) => setFacultyName(event.target.value)}
              />
            </label>
            <br />
            <button className="popup-submit-button" type="submit">
              Submit
            </button>
            <p className="text-danger">{popupError}</p>
          </form>
        </div>
      )}
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
          <Col
            className={`m-5 ${dataShow ? "d-none" : "d-block"}`}
            style={{ height: "100%", overflow: "scroll" }}
          >
            <table>
              <tr>
                <th className="text-light">Student Id</th>
                <th className="text-light">Student Name</th>
                <th className="text-light">Faculty Name</th>
                <th className="text-light">actions</th>
              </tr>
              {loggedData?.map((each) => {
                return (
                  <tr key={each.id}>
                    <td className="text-light">{each.attributes.studentId}</td>
                    <td className="text-light">
                      {each.attributes.studentName}
                    </td>
                    <td className="text-light">
                      {each.attributes.facultyName}
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-light"
                        onClick={() => deleteHandler(each.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-light"
                        onClick={() => {
                          setEditElement(each.id);
                          setIsOpen(true);
                        }}
                      >
                        Edit
                      </button>
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
