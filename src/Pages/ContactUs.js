import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CollapsibleExample from "./Header";

const ContactUsPage = () => {
  return (
    <>
      <CollapsibleExample />
      <Container fluid className="bg-dark contact-mainContainer">
        <Row className="justify-content-center align-items-center">
          <Col md={5} className="px-4">
            <h1>Contact Us</h1>
            <p>Please fill out the form below to get in touch with us.</p>
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group controlId="formBasicMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter your message"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={7} className="mt-5">
            <h2>Random Details</h2>
            <p>Address: 123 Main St, Anytown USA</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@example.com</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactUsPage;
