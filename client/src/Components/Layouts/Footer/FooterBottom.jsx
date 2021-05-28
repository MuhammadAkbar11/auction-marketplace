import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FooterBottom = () => {
  return (
    <div className="footer-bottom pt30 pb30 ">
      <Container className="px-md-8" fluid>
        <Row className=" flex-row-reverse">
          <Col lg={6} md={6}>
            <div className="payment-img payment-img-right">
              {/* <a href="#">
                  <img src="assets/images/icon-img/payment.png" alt />
                </a> */}
            </div>
          </Col>
          <Col lg={6} md={6}>
            <div className="copyright copyright-center">
              <p>
                Copyright © 2020 BaeBid |{" "}
                <a target="_blank" href="https://github.com/MuhammadAkbar11">
                  Built by Muhammad Akbar Let-let
                </a>
                .
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterBottom;
