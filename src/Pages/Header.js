import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function CollapsibleExample() {
  return (
    <Navbar
      collapseOnSelect
      className="w-100"
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="/">Student-Training System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{ paddingLeft: "60%" }}>
            <Nav.Link href="/contact-us/">Contact-Us</Nav.Link>
            <NavDropdown title="Info" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/student-details/">
                Student
              </NavDropdown.Item>
              <NavDropdown.Item href="/training-form/">
                Training
              </NavDropdown.Item>
              <NavDropdown.Item href="/faculty-form/">Faculty</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Courses" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/student-details/">Java</NavDropdown.Item>
              <NavDropdown.Item href="/student-details/">
                Python
              </NavDropdown.Item>
              <NavDropdown.Item href="/student-details/">HTML</NavDropdown.Item>

              <NavDropdown.Item href="/student-details/">
                Javascript
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
