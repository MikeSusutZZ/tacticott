import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ThankYou() {
  return (
    <Container className="text-center my-5">
      <h1>Thank You for Your Contribution!</h1>
      <img src="https://your-image-url.com" alt="Thank you" className="my-4" />
      <Link to="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </Container>
  );
}

export default ThankYou;
