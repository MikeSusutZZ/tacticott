import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './components/Home';
import Entry from './components/Entry';
import ThankYou from './components/ThankYou';
import Compare from './components/Compare';
import About from './components/About'
import './App.css'

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Tacticott</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="about">Stat Explanations</Nav.Link>
              <Nav.Link as={Link} to="/compare">Compare / Search</Nav.Link>
              <Nav.Link as={Link} to="/entry">Make an Entry</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entry" element={<Entry />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/about" element={<About />} /> {/* Add About route */}
      </Routes>
      </Container>
    </Router>
  );
}

export default App;
