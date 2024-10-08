import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <Container className="text-center my-5">
      <div className="d-flex flex-column align-items-center">
        <h1>Thank You for Your Contribution!</h1>
        <img
          src="https://s1.zerochan.net/Whimsicott.600.3753121.jpg"
          alt="Thank you"
          className="my-4"
        />
        <Link to="/">
          <Button variant="primary">Return Home</Button>
        </Link>
      </div>
    </Container>
  );
}

export default ThankYou;
