import { Container, Row, Col, Button, Navbar } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import DrugOrderPopUp from "./Components/DrugOrderPopUp";

const Home = () => {
  const [drugOrderShow, setDrugOrderShow] = useState(false);

  const handleDrugOrderClose = () => setDrugOrderShow(false);
  const handleDrugOrderShow = () => setDrugOrderShow(true);

  return (
    <div>
      <div className="head">
        <Navbar>
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="images/first-aid-kit-doctor-svgrepo-com.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Pharmease
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Row className="heading">
          <Col>
            <h1>
              Optimize Your <span>Health</span>
            </h1>
            <p>
              We make your health goals easier to achieve through our offerings.
            </p>
          </Col>
          <Col>
            <Image src="images/download.jpeg" fluid />
          </Col>
        </Row>
      </div>
      <Row className="intro">
        <h1>We are the pharmacy partner you never knew you needed</h1>
        <p>
          We handle all the heavy lifting so you don’t have to. Our
          comprehensive range of services ensures you have a seamless pharmacy
          experience. Whether it’s picking up supplies or providing virtual
          consultations, we ensure high-quality service across the board.
        </p>
      </Row>

      <Row className="services" style={{ backgroundColor: "#F9F2FF" }}>
        <Col className="imgCol">
          <img src="images/download.png" alt="Medication" />
        </Col>
        <Col className="desCol">
          <h2>Get medication seamlessly</h2>
          <p>
            We make ordering medication a seamless and quick process. We
            understand how time-consuming and stressful getting medication can
            be so we created a better experience for you.
          </p>
          <ul>
            <li>
              Sign up to refill your medication & supplements on schedule.
            </li>
            <li>Get reminders and check-ins on your progress.</li>
          </ul>
          <Button variant="primary" onClick={handleDrugOrderShow}>
            ORDER NOW →
          </Button>
        </Col>
      </Row>
      <Row className="services" style={{ backgroundColor: "#e5fffd" }}>
        <Col className="imgCol">
          <img src="images/download.png" alt="Consultation" />
        </Col>
        <Col className="desCol">
          <h2>Virtual consultation</h2>
          <p>
            Get medication & supplement recommendations, health advice, and our
            unwavering support.
          </p>
          <ul>
            <li>
              Book a virtual chat with a licensed pharmacist & other health
              specialists for free.
            </li>
            <li>Start optimizing your health journey.</li>
          </ul>
          <Button variant="primary">BOOK A SESSION →</Button>
        </Col>
      </Row>
      <div className="cardContainer">
        <Row className="outerCard">
          <Col className="desCol">
            <h2>Simpler, better, faster pharmacy</h2>
            <p>
              We have simplified the parts of pharmacy that are complicated,
              cumbersome, and time-consuming. We believe in a pharmacy that is
              accessible to everyone and works for everyone.
            </p>
          </Col>
          <Col className="imageCol">
            <Image src="images/download.jpeg" fluid />
          </Col>
        </Row>
      </div>
      <Row className="footer">
        <Col className="contact">
          <h3>Get in touch</h3>
          <p>anderoyenisi@gmail.com</p>
          <p>
            <span>+234</span> <span>(0)</span> 816 858 2369
          </p>
        </Col>
        <Col>
          <h3>Opening Hours</h3>
          <p>Monday - Saturday, 8am-6pm</p>
          <p>Sunday, 1pm-6pm</p>
        </Col>
      </Row>

      <DrugOrderPopUp
        show={drugOrderShow}
        handleClose={handleDrugOrderClose}
      ></DrugOrderPopUp>
    </div>
  );
};

export default Home;
