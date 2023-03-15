import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../App.css";
import CollapsibleExample from "./Header";

function FacultyForm() {
  // Edit Option Hooks
  const [isOpen, setIsOpen] = useState(false);
  const [facultyId, setFacultyId] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [popupError, setPopupError] = useState("");
  const [editElement, setEditElement] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission
    if (facultyId === "" || facultyName === "") {
      setPopupError("please fill all details");
    } else {
      let body = {
        data: {
          facultyId: facultyId,
          facultyName: facultyName,
        },
      };

      fetch(`http://localhost:1337/api/faculties/${editElement.toString()}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }).then(() => {
        fetchingData();
        setFacultyId("");
        setFacultyName("");
        setPopupError("");
        setIsOpen(false);
      });
    }
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
        fetchingData();
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

  const deleteHandler = (id) => {
    // console.log(id)
    fetch(`http://localhost:1337/api/faculties/${id.toString()}`, {
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
              Faculty id:
              <input
                className="popup-input"
                type="number"
                value={facultyId}
                onChange={(event) => setFacultyId(event.target.value)}
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

export default FacultyForm;
