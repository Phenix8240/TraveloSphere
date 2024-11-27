import React from 'react';
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">
          <img src="/logo.svg" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/packages">Packages</Nav.Link>
            <Nav.Link href="/add-package">Add Packages</Nav.Link>
            <Nav.Link href="/weather-trip">Weather Trip</Nav.Link>
            <Nav.Link href="/reviews">Reviews</Nav.Link>
          </Nav>

          {/* Replace Nav.Link for Login and Register with Buttons from react-bootstrap */}
          <Button variant="outline-primary" className="me-2" href="/register">
            Register
          </Button>
          <Button variant="primary" href="/login">
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
