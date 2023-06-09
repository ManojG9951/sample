import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../App.css";
import CollapsibleExample from "./Header";

function TrainingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [trainingId, setTrainingId] = useState("");
  const [fromdate, setFromDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [popupError, setPopupError] = useState("");
  const [editElement, setEditElement] = useState("");

  const [loginDetails, setLoginDetails] = useState({
    studentName: "",
    trainingId: "",
    fromDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");
  const [dataShow, setDataShow] = useState(true);
  const [loggedData, setLoggedData] = useState();
  const changeHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission
    if (studentName === "" || trainingId === "") {
      setPopupError("please fill all details");
    } else {
      let body = {
        data: {
          name: studentName,
          trainingId: trainingId,
          fromDate: fromdate,
          endDate: enddate,
        },
      };

      fetch(
        `http://localhost:1337/api/training-datas/${editElement.toString()}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      ).then(() => {
        fetchingData();
        setStudentName("");
        setTrainingId("");
        setFromDate("");
        setEndDate("");
        setPopupError("");
        setIsOpen(false);
      });
    }
  };
  const submitHandler = () => {
    if (
      loginDetails.fromDate === "" ||
      loginDetails.trainingId === "" ||
      loginDetails.studentName === "" ||
      loginDetails.endDate === ""
    ) {
      setError("please Fill All Details before Submitting");
    } else {
      let body = {
        data: {
          name: loginDetails.studentName,
          trainingId: loginDetails.trainingId,
          fromDate: loginDetails.fromDate,
          endDate: loginDetails.endDate,
        },
      };
      setError("submitting");
      fetch(`http://localhost:1337/api/training-datas`, {
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
      console.log(loginDetails);
    }
  };
  const fetchingData = () => {
    fetch(`http://localhost:1337/api/training-datas`)
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
    fetch(`http://localhost:1337/api/training-datas/${id.toString()}`, {
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
              Training Id:
              <input
                className="popup-input"
                type="number"
                value={trainingId}
                onChange={(event) => setTrainingId(event.target.value)}
              />
            </label>
            <br />
            <label>
              From Data:
              <input
                className="popup-input"
                type="date"
                value={fromdate}
                onChange={(event) => setFromDate(event.target.value)}
              />
            </label>
            <br />
            <label>
              End Data:
              <input
                className="popup-input"
                type="date"
                value={enddate}
                onChange={(event) => setEndDate(event.target.value)}
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
                <label>Name</label>
              </Col>
              <Col xs={12} md={8}>
                <input
                  name="studentName"
                  value={loginDetails.studentName}
                  type="text"
                  onChange={(e) => changeHandler(e)}
                />
              </Col>
            </Row>
            <Row xs={12} className="my-4">
              <Col xs={12} md={4}>
                <label>Training Id</label>
              </Col>
              <Col xs={12} md={8}>
                <input
                  name="trainingId"
                  value={loginDetails.trainingId}
                  onChange={(e) => changeHandler(e)}
                  type="number"
                />
              </Col>
            </Row>
            <Row xs={12} className="my-4">
              <Col xs={12} md={4}>
                <label>From Date</label>
              </Col>
              <Col xs={12} md={8}>
                <input
                  className="dateInput"
                  name="fromDate"
                  value={loginDetails.fromDate}
                  onChange={(e) => changeHandler(e)}
                  type="date"
                />
              </Col>
            </Row>
            <Row xs={12} className="my-4">
              <Col xs={12} md={4}>
                <label>End Date</label>
              </Col>
              <Col xs={12} md={8}>
                <input
                  className="dateInput"
                  name="endDate"
                  value={loginDetails.endDate}
                  onChange={(e) => changeHandler(e)}
                  type="date"
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
                <th className="text-light">Student Name</th>
                <th className="text-light">Training Id</th>
                <th className="text-light">From Date</th>
                <th className="text-light">End Date</th>
              </tr>
              {loggedData?.map((each) => {
                return (
                  <tr>
                    <td className="text-light">{each.attributes.name}</td>
                    <td className="text-light">{each.attributes.trainingId}</td>
                    <td className="text-light">{each.attributes.fromDate}</td>
                    <td className="text-light">{each.attributes.endDate}</td>
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

export default TrainingForm;
